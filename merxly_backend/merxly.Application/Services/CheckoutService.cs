using AutoMapper;
using merxly.Application.DTOs.Checkout;
using merxly.Application.DTOs.Order;
using merxly.Application.Interfaces;
using merxly.Application.Interfaces.Services;
using merxly.Domain.Entities;
using merxly.Domain.Enums;
using merxly.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace merxly.Application.Services
{
    public class CheckoutService : ICheckoutService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStripeService _stripeService;
        private readonly IMapper _mapper;
        private readonly ILogger<CheckoutService> _logger;

        public CheckoutService(
            IUnitOfWork unitOfWork,
            IStripeService stripeService,
            IMapper mapper,
            ILogger<CheckoutService> logger)
        {
            _unitOfWork = unitOfWork;
            _stripeService = stripeService;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<CheckoutResponseDto> ProcessCheckoutAsync(
            string userId,
            CheckoutRequestDto request,
            CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Processing checkout for user {UserId} with {ItemCount} items", userId, request.Items.Count);

            // 1. Validate user
            var user = await _unitOfWork.ApplicationUser.GetByIdAsync(userId, cancellationToken);
            if (user == null)
            {
                _logger.LogWarning("User {UserId} not found during checkout", userId);
                throw new NotFoundException("User not found");
            }

            // 2. Validate shipping address
            var shippingAddress = await _unitOfWork.Address.GetByIdAsync(request.ShippingAddressId, cancellationToken);
            if (shippingAddress == null || shippingAddress.UserId != userId)
            {
                _logger.LogWarning("Invalid shipping address {AddressId} for user {UserId}", request.ShippingAddressId, userId);
                throw new NotFoundException("Shipping address not found or does not belong to user");
            }

            // 3. Validate and prepare order items grouped by store
            var orderItemsData = await ValidateAndPrepareOrderItemsAsync(request.Items, cancellationToken);
            var itemsByStore = orderItemsData.GroupBy(x => x.StoreId).ToList();

            var variantIds = orderItemsData.Select(x => x.ProductVariantId).Distinct().ToList();
            var variants = await _unitOfWork.ProductVariant.GetByIdsAsync(variantIds, cancellationToken);
            var variantDict = variants.ToDictionary(x => x.Id);

            // 4. Update stock quantities
            foreach (var itemData in orderItemsData)
            {
                var variant = variantDict[itemData.ProductVariantId];
                variant.StockQuantity -= itemData.Quantity;
                _unitOfWork.ProductVariant.Update(variant);
            }

            // 5. Calculate totals
            decimal totalAmount = orderItemsData.Sum(x => x.TotalPrice);

            // 6. Ensure user has Stripe customer ID
            if (string.IsNullOrEmpty(user.StripeCustomerId))
            {
                _logger.LogInformation("Creating Stripe customer for user {UserId} with email {Email}", userId, user.Email);

                var customer = await _stripeService.CreateCustomerAsync(
                    user.Email!,
                    $"{user.FirstName} {user.LastName}",
                    cancellationToken);

                user.StripeCustomerId = customer.Id;
                _unitOfWork.ApplicationUser.Update(user);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            // 7. Determine payment method
            string? paymentMethodId = request.PaymentMethodId;
            if (string.IsNullOrEmpty(paymentMethodId))
            {
                paymentMethodId = user.DefaultPaymentMethodId;
            }

            // 8. Generate order number
            var orderNumber = await _unitOfWork.Order.GenerateOrderNumberAsync(cancellationToken);

            // 9. Create main order (global data only)
            var order = new Order
            {
                OrderNumber = orderNumber,
                TotalAmount = totalAmount,
                UserId = userId,
                ShippingAddressId = request.ShippingAddressId
            };

            await _unitOfWork.Order.AddAsync(order, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // 10. Create sub-orders (one per store)
            var subOrders = new List<SubOrder>();
            int storeIndex = 1;

            foreach (var storeGroup in itemsByStore)
            {
                var storeId = storeGroup.Key;
                var storeItems = storeGroup.ToList();
                var storeTotal = storeItems.Sum(x => x.TotalPrice);

                var subOrder = new SubOrder
                {
                    SubOrderNumber = $"{orderNumber}-S{storeIndex}",
                    OrderId = order.Id,
                    StoreId = storeId,
                    Status = OrderStatus.Pending,
                    SubTotal = storeTotal,
                    TotalAmount = storeTotal,
                    Notes = request.StoreNotes?.GetValueOrDefault(storeId)
                };

                subOrders.Add(subOrder);
                storeIndex++;
            }

            await _unitOfWork.SubOrder.AddRangeAsync(subOrders, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // 11. Create order items for each sub-order
            var allOrderItems = new List<OrderItem>();
            var allStatusHistories = new List<OrderStatusHistory>();

            foreach (var subOrder in subOrders)
            {
                var storeItems = orderItemsData.Where(x => x.StoreId == subOrder.StoreId).ToList();

                foreach (var item in storeItems)
                {
                    var orderItem = new OrderItem
                    {
                        SubOrderId = subOrder.Id,
                        ProductVariantId = item.ProductVariantId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice,
                        TotalPrice = item.TotalPrice,
                        StoreId = item.StoreId
                    };
                    allOrderItems.Add(orderItem);
                }

                // Create status history for each sub-order
                var statusHistory = new OrderStatusHistory
                {
                    SubOrderId = subOrder.Id,
                    Status = OrderStatus.Pending,
                    Notes = "Order created"
                };
                allStatusHistories.Add(statusHistory);
            }

            await _unitOfWork.OrderItem.AddRangeAsync(allOrderItems, cancellationToken);
            await _unitOfWork.OrderStatusHistory.AddRangeAsync(allStatusHistories, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // 12. Create payment intent with Stripe
            var metadata = new Dictionary<string, string>
            {
                { "order_id", order.Id.ToString() },
                { "order_number", order.OrderNumber },
                { "user_id", userId }
            };

            var paymentIntent = await _stripeService.CreatePaymentIntentAsync(
                user.StripeCustomerId,
                totalAmount,
                "vnd",
                paymentMethodId,
                metadata,
                cancellationToken);

            // 13. Calculate commission and create payment record
            decimal totalCommission = CalculateTotalCommission(allOrderItems, orderItemsData);

            var payment = new Payment
            {
                PaymentIntentId = paymentIntent.Id,
                Amount = totalAmount,
                Currency = "vnd",
                TotalCommission = totalCommission,
                Status = PaymentStatus.Pending,
                StripeCustomerId = user.StripeCustomerId,
                PaymentMethodId = paymentMethodId,
                OrderId = order.Id
            };

            await _unitOfWork.Payment.AddAsync(payment, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // 14. Create store transfers (one per sub-order)
            var storeTransfers = await CreateStoreTransfersAsync(
                subOrders,
                orderItemsData,
                payment.Id,
                cancellationToken);

            await _unitOfWork.StoreTransfer.AddRangeAsync(storeTransfers, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // 15. Load order with all relationships for response
            var orderWithDetails = await _unitOfWork.Order.GetByIdWithDetailsAsync(order.Id, cancellationToken);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // 16. Map to response DTO
            var orderDto = _mapper.Map<OrderDto>(orderWithDetails);

            var response = new CheckoutResponseDto
            {
                Order = orderDto,
                ClientSecret = paymentIntent.ClientSecret
            };

            _logger.LogInformation("Checkout completed successfully. Order: {OrderNumber}, SubOrders: {SubOrderCount}, PaymentIntent: {PaymentIntentId}",
                order.OrderNumber, subOrders.Count, paymentIntent.Id);

            return response;
        }

        private async Task<List<OrderItemData>> ValidateAndPrepareOrderItemsAsync(
            List<CheckoutItemDto> items,
            CancellationToken cancellationToken)
        {
            _logger.LogInformation("Validating and preparing {ItemCount} order items", items.Count);
            var orderItemsData = new List<OrderItemData>();

            var variantCheckoutInfos = await _unitOfWork.ProductVariant.GetVariantsForCheckoutAsync(
                items.Select(i => i.ProductVariantId).Distinct().ToList(),
                cancellationToken);

            var dict = variantCheckoutInfos.ToDictionary(x => x.VariantId);

            foreach (var item in items)
            {
                if (!dict.TryGetValue(item.ProductVariantId, out var variant))
                {
                    _logger.LogWarning("Product variant {ProductVariantId} not found", item.ProductVariantId);
                    throw new NotFoundException($"Product variant {item.ProductVariantId} not found");
                }

                if (!variant.VariantIsActive)
                {
                    _logger.LogWarning("Product variant {ProductVariantId} is not active", item.ProductVariantId);
                    throw new InvalidOperationException($"Product variant {item.ProductVariantId} is not active");
                }

                if (!variant.ProductIsActive)
                {
                    _logger.LogWarning("Product {ProductId} is not active", variant.ProductId);
                    throw new InvalidOperationException($"Product {variant.ProductId} is not active");
                }

                if (!variant.StoreIsActive)
                {
                    _logger.LogWarning("Store {StoreId} is not active for product variant {ProductVariantId}", variant.StoreId, item.ProductVariantId);
                    throw new InvalidOperationException($"Store {variant.StoreId} is not active");
                }

                if (variant.StockQuantity < item.Quantity)
                {
                    _logger.LogWarning("Insufficient stock for product variant {ProductVariantId}. Requested: {Requested}, Available: {Available}",
                        item.ProductVariantId, item.Quantity, variant.StockQuantity);
                    throw new InvalidOperationException($"Insufficient stock for product variant {item.ProductVariantId}");
                }

                orderItemsData.Add(new OrderItemData
                {
                    ProductVariantId = item.ProductVariantId,
                    Quantity = item.Quantity,
                    UnitPrice = variant.Price,
                    TotalPrice = variant.Price * item.Quantity,
                    StoreId = variant.StoreId,
                    CommissionRate = variant.CommissionRate,
                });
            }

            return orderItemsData;
        }

        private decimal CalculateTotalCommission(List<OrderItem> orderItems, List<OrderItemData> orderItemsData)
        {
            decimal totalCommission = 0;

            foreach (var orderItem in orderItems)
            {
                var itemData = orderItemsData.First(x => x.ProductVariantId == orderItem.ProductVariantId);
                var commission = orderItem.TotalPrice * itemData.CommissionRate;
                totalCommission += commission;
            }

            return totalCommission;
        }

        private async Task<List<StoreTransfer>> CreateStoreTransfersAsync(
            List<SubOrder> subOrders,
            List<OrderItemData> orderItemsData,
            Guid paymentId,
            CancellationToken cancellationToken)
        {
            var storeTransfers = new List<StoreTransfer>();

            foreach (var subOrder in subOrders)
            {
                var storeItems = orderItemsData.Where(x => x.StoreId == subOrder.StoreId).ToList();
                decimal storeTotal = storeItems.Sum(x => x.TotalPrice);
                decimal storeCommission = 0;

                foreach (var item in storeItems)
                {
                    var commission = item.TotalPrice * item.CommissionRate;
                    storeCommission += commission;
                }

                decimal transferAmount = storeTotal - storeCommission;

                var storeTransfer = new StoreTransfer
                {
                    PaymentId = paymentId,
                    SubOrderId = subOrder.Id,
                    StoreId = subOrder.StoreId,
                    Amount = transferAmount,
                    Commission = storeCommission,
                    Status = StoreTransferStatus.Pending
                };

                storeTransfers.Add(storeTransfer);
            }

            return storeTransfers;
        }

        // Helper class to hold order item data during processing
        private class OrderItemData
        {
            public Guid ProductVariantId { get; set; }
            public int Quantity { get; set; }
            public decimal UnitPrice { get; set; }
            public decimal TotalPrice { get; set; }
            public Guid StoreId { get; set; }
            public decimal CommissionRate { get; set; }
        }
    }
}
