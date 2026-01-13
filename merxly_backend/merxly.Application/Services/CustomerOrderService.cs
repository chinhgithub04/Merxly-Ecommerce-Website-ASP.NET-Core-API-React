using AutoMapper;
using merxly.Application.DTOs.Common;
using merxly.Application.DTOs.CustomerOrders;
using merxly.Application.Interfaces;
using merxly.Application.Interfaces.Services;
using merxly.Domain.Entities;
using merxly.Domain.Enums;
using merxly.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace merxly.Application.Services
{
    public class CustomerOrderService : ICustomerOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IStripeService _stripeService;
        private readonly ILogger<CustomerOrderService> _logger;

        public CustomerOrderService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IStripeService stripeService,
            ILogger<CustomerOrderService> logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _stripeService = stripeService;
            _logger = logger;
        }

        public async Task<PaginatedResultDto<CustomerSubOrderDto>> GetCustomerOrdersAsync(
            string customerId,
            CustomerSubOrderFilterDto filter,
            CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Getting orders for customer {CustomerId} with filters: Status={Status}, SearchTerm={SearchTerm}, FromDate={FromDate}, ToDate={ToDate}, Page={Page}, PageSize={PageSize}",
                customerId, filter.Status, filter.SearchTerm, filter.FromDate, filter.ToDate, filter.PageNumber, filter.PageSize);

            var result = await _unitOfWork.SubOrder.GetCustomerOrdersAsync(customerId, filter, cancellationToken);

            var paginatedResult = _mapper.Map<PaginatedResultDto<CustomerSubOrderDto>>(result);

            _logger.LogInformation("Retrieved {Count} orders for customer {CustomerId} (Page {Page}/{TotalPages})",
                paginatedResult.Items.Count, customerId, paginatedResult.PageNumber, paginatedResult.TotalPages);

            return paginatedResult;
        }

        public async Task<CustomerSubOrderDetailDto> GetCustomerOrderByIdAsync(
            string customerId,
            Guid subOrderId,
            CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Getting sub-order {SubOrderId} for customer {CustomerId}", subOrderId, customerId);

            var subOrder = await _unitOfWork.SubOrder.GetByIdWithDetailsAsync(subOrderId, cancellationToken);

            if (subOrder == null)
            {
                _logger.LogWarning("Sub-order {SubOrderId} not found", subOrderId);
                throw new NotFoundException($"Sub-order with ID {subOrderId} not found.");
            }

            if (subOrder.Order.UserId != customerId)
            {
                _logger.LogWarning("Sub-order {SubOrderId} does not belong to customer {CustomerId}", subOrderId, customerId);
                throw new ForbiddenAccessException("You don't have permission to access this order.");
            }

            var dto = _mapper.Map<CustomerSubOrderDetailDto>(subOrder);

            _logger.LogInformation("Retrieved sub-order {SubOrderId} for customer {CustomerId}", subOrderId, customerId);

            return dto;
        }

        public async Task<CustomerSubOrderDetailDto> UpdateCustomerSubOrderStatusAsync(
            string customerId,
            Guid subOrderId,
            UpdateCustomerSubOrderStatusDto dto,
            CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Updating sub-order {SubOrderId} status to {NewStatus} for customer {CustomerId}",
                subOrderId, dto.Status, customerId);

            var subOrder = await _unitOfWork.SubOrder.GetByIdWithDetailsAsync(subOrderId, cancellationToken);

            if (subOrder == null)
            {
                _logger.LogWarning("Sub-order {SubOrderId} not found", subOrderId);
                throw new NotFoundException($"Sub-order with ID {subOrderId} not found.");
            }

            if (subOrder.Order.UserId != customerId)
            {
                _logger.LogWarning("Sub-order {SubOrderId} does not belong to customer {CustomerId}", subOrderId, customerId);
                throw new ForbiddenAccessException("You don't have permission to update this order.");
            }

            // Validate status transition
            ValidateCustomerStatusTransition(subOrder.Status, dto.Status);

            var oldStatus = subOrder.Status;
            subOrder.Status = dto.Status;

            if (dto.Status == OrderStatus.Completed)
            {
                subOrder.CompletedAt = DateTime.UtcNow;

                // Update product total sold for each product in the order
                var productQuantities = subOrder.OrderItems
                    .GroupBy(oi => oi.ProductVariant!.ProductId)
                    .Select(g => new { ProductId = g.Key, TotalQuantity = g.Sum(oi => oi.Quantity) });

                foreach (var pq in productQuantities)
                {
                    var product = subOrder.OrderItems
                        .First(oi => oi.ProductVariant!.ProductId == pq.ProductId)
                        .ProductVariant!.Product;

                    product.TotalSold += pq.TotalQuantity;
                }

                // Find the existing StoreTransfer record created during checkout
                var storeTransfer = subOrder.StoreTransfers.FirstOrDefault();
                if (storeTransfer == null)
                {
                    _logger.LogWarning("No StoreTransfer found for SubOrder {SubOrderId}", subOrderId);
                    throw new BadRequestException("Store transfer record not found for this order.");
                }

                // Check if store has Stripe Connect account
                if (string.IsNullOrEmpty(subOrder.Store.StripeConnectAccountId))
                {
                    _logger.LogWarning("Store {StoreId} does not have a Stripe Connect account", subOrder.StoreId);
                    storeTransfer.Status = StoreTransferStatus.Failed;
                    storeTransfer.FailureMessage = "Store does not have a connected Stripe account";
                }
                else
                {
                    try
                    {
                        // Get the charge ID from the payment intent
                        var paymentIntent = await _stripeService.GetPaymentIntentAsync(
                            subOrder.Order.Payment!.PaymentIntentId,
                            cancellationToken);

                        if (string.IsNullOrEmpty(paymentIntent.LatestChargeId))
                        {
                            _logger.LogWarning("No charge found for PaymentIntent {PaymentIntentId}", paymentIntent.Id);
                            throw new BadRequestException("No charge found for this payment");
                        }


                        var transferAmount = storeTransfer.Amount;
                        var transferCurrency = "usd";

                        if (subOrder.Order.Payment.Currency.Equals("vnd", StringComparison.OrdinalIgnoreCase))
                        {
                            transferAmount = Math.Round(storeTransfer.Amount / 26287.43m, 2);
                            _logger.LogInformation(
                                "Converted transfer amount from VND {VndAmount} to USD {UsdAmount}",
                                storeTransfer.Amount, transferAmount);
                        }

                        // Transfer money to store's Stripe Connect account
                        var transfer = await _stripeService.CreateTransferAsync(
                            subOrder.Store.StripeConnectAccountId,
                            transferAmount,
                            transferCurrency,
                            paymentIntent.LatestChargeId,
                            new Dictionary<string, string>
                            {
                                { "sub_order_id", subOrderId.ToString() },
                                { "sub_order_number", subOrder.SubOrderNumber },
                                { "store_id", subOrder.StoreId.ToString() }
                            },
                            cancellationToken);

                        storeTransfer.StripeTransferId = transfer.Id;
                        storeTransfer.Status = StoreTransferStatus.Completed;
                        storeTransfer.TransferredAt = DateTime.UtcNow;

                        _logger.LogInformation(
                            "Successfully transferred {Amount} to store {StoreId} (Stripe Transfer ID: {TransferId})",
                            storeTransfer.Amount, subOrder.StoreId, transfer.Id);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to transfer money to store {StoreId} for SubOrder {SubOrderId}",
                            subOrder.StoreId, subOrderId);
                        storeTransfer.Status = StoreTransferStatus.Failed;
                        storeTransfer.FailureMessage = ex.Message;
                    }
                }

                _unitOfWork.StoreTransfer.Update(storeTransfer);
            }

            // Record status change in history
            var statusHistory = new OrderStatusHistory
            {
                Id = Guid.NewGuid(),
                SubOrderId = subOrderId,
                Status = dto.Status,
                Notes = dto.Notes,
                UpdatedByUserId = customerId
            };

            _unitOfWork.SubOrder.Update(subOrder);
            await _unitOfWork.OrderStatusHistory.AddAsync(statusHistory, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Updated sub-order {SubOrderId} status from {OldStatus} to {NewStatus}",
                subOrderId, oldStatus, dto.Status);

            // Fetch updated order with all details
            var updatedSubOrder = await _unitOfWork.SubOrder.GetByIdWithDetailsAsync(subOrderId, cancellationToken);
            return _mapper.Map<CustomerSubOrderDetailDto>(updatedSubOrder!);
        }

        private void ValidateCustomerStatusTransition(OrderStatus currentStatus, OrderStatus newStatus)
        {
            // Customer can only update to Cancelled or Completed
            if (newStatus != OrderStatus.Cancelled && newStatus != OrderStatus.Completed)
            {
                _logger.LogWarning("Customer attempted invalid status transition to {NewStatus}", newStatus);
                throw new BadRequestException($"Customers can only cancel orders or mark them as completed.");
            }

            // Cancelled: Only allowed when current status is Confirmed
            if (newStatus == OrderStatus.Cancelled)
            {
                if (currentStatus != OrderStatus.Confirmed)
                {
                    _logger.LogWarning("Invalid transition: Cannot cancel order with status {CurrentStatus}", currentStatus);
                    throw new BadRequestException($"Orders can only be cancelled when they are in 'Confirmed' status. Current status: {currentStatus}");
                }
                return;
            }

            // Completed: Only allowed when current status is Shipped
            if (newStatus == OrderStatus.Completed)
            {
                if (currentStatus != OrderStatus.Shipped)
                {
                    _logger.LogWarning("Invalid transition: Cannot complete order with status {CurrentStatus}", currentStatus);
                    throw new BadRequestException($"Orders can only be marked as completed when they are in 'Shipped' status. Current status: {currentStatus}");
                }
                return;
            }
        }
    }
}
