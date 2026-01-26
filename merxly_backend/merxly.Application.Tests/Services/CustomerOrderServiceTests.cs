using AutoMapper;
using FluentAssertions;
using merxly.Application.DTOs.CustomerOrders;
using merxly.Application.Interfaces;
using merxly.Application.Interfaces.Services;
using merxly.Application.Mappings;
using merxly.Application.Services;
using merxly.Domain.Entities;
using merxly.Domain.Enums;
using merxly.Domain.Exceptions;
using Microsoft.Extensions.Logging;
using Moq;

namespace merxly.Application.Tests.Services
{
    public class CustomerOrderServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly Mock<IStripeService> _stripeServiceMock;
        private readonly Mock<ILogger<CustomerOrderService>> _loggerMock;
        private readonly IMapper _mapper;
        private readonly CustomerOrderService _customerOrderService;

        private readonly string customerId = "user-123";
        private readonly Guid subOrderId = Guid.NewGuid();
        private readonly string paymentIntentId = "pi_test_123";
        private readonly string currency = "vnd";
        private readonly string stripeAccountId = "acct_test_123";
        private readonly string stripeTransferId = "tr_test_123";
        private readonly string chargeId = "ch_test_123";

        public CustomerOrderServiceTests()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _unitOfWorkMock.DefaultValue = DefaultValue.Mock;
            _stripeServiceMock = new Mock<IStripeService>();
            _loggerMock = new Mock<ILogger<CustomerOrderService>>();

            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            _mapper = mapperConfig.CreateMapper();

            _customerOrderService = new CustomerOrderService(
                _unitOfWorkMock.Object,
                _mapper,
                _stripeServiceMock.Object,
                _loggerMock.Object
            );

        }


        [Fact]
        public async Task UpdateCustomerSubOrderStatusAsync_CompletedOrderForStoreWithoutStripeAccount_ShouldSetStoreTransferStatusToFailed()
        {
            // Arrange
            var updateCustomerSubOrderStatusDto = new UpdateCustomerSubOrderStatusDto
            {
                Status = OrderStatus.Completed
            };

            var subOrder = new SubOrder
            {
                Id = subOrderId,
                Status = OrderStatus.Shipped,
                Store = new Store { StripeConnectAccountId = null },
                Order = new Order
                {
                    UserId = customerId,
                    Payment = new Payment { PaymentIntentId = paymentIntentId, Currency = currency }
                },
                StoreTransfers = new List<StoreTransfer> { new StoreTransfer() }
            };

            _unitOfWorkMock.Setup(u => u.SubOrder.GetByIdWithDetailsAsync(subOrderId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(subOrder);
            // Act
            await _customerOrderService.UpdateCustomerSubOrderStatusAsync(customerId, subOrderId, updateCustomerSubOrderStatusDto);
            // Assert
            subOrder.StoreTransfers.Should().ContainSingle(x => x.Status == StoreTransferStatus.Failed);
            subOrder.StoreTransfers.First().FailureMessage.Should().Be("Store does not have a connected Stripe account");
        }

        [Fact]
        public async Task UpdateCustomerSubOrderStatusAsync_ToCompleted_ShouldTriggerStripeTransfer()
        {
            var storeTransfer = new StoreTransfer
            {
                Amount = 900000,
            };
            var subOrder = new SubOrder
            {
                Id = subOrderId,
                Status = OrderStatus.Shipped,
                TotalAmount = 1000000,
                Store = new Store { StripeConnectAccountId = stripeAccountId, CommissionRate = 10 },
                Order = new Order
                {
                    UserId = customerId,
                    Payment = new Payment { PaymentIntentId = paymentIntentId, Currency = currency }
                },
                StoreTransfers = new List<StoreTransfer> { storeTransfer },
                StatusHistory = new List<OrderStatusHistory>()
            };

            _unitOfWorkMock.Setup(u => u.SubOrder.GetByIdWithDetailsAsync(subOrderId, It.IsAny<CancellationToken>()))
                    .ReturnsAsync(subOrder);

            _stripeServiceMock.Setup(s => s.GetPaymentIntentAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                       .ReturnsAsync(new Stripe.PaymentIntent { LatestChargeId = chargeId });

            _stripeServiceMock.Setup(s => s.CreateTransferAsync(
                It.IsAny<string>(),
                It.IsAny<decimal>(),
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<Dictionary<string, string>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Stripe.Transfer { Id = stripeTransferId });

            var dto = new UpdateCustomerSubOrderStatusDto { Status = OrderStatus.Completed };

            // Act
            await _customerOrderService.UpdateCustomerSubOrderStatusAsync(customerId, subOrderId, dto);

            // Assert
            subOrder.Status.Should().Be(OrderStatus.Completed);
            subOrder.CompletedAt.Should().NotBeNull();

            subOrder.StoreTransfers.Should().ContainSingle(st =>
                st.Status == StoreTransferStatus.Completed &&
                st.StripeTransferId == stripeTransferId
            );

            _stripeServiceMock.Verify(s => s.CreateTransferAsync(
                stripeAccountId,
                It.Is<decimal>(amount => amount > 0),
                It.IsAny<string>(),
                chargeId,
                It.IsAny<Dictionary<string, string>>(),
                It.IsAny<CancellationToken>()),
                Times.Once);

            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.AtLeastOnce);
        }

        [Fact]
        public async Task UpdateCustomerSubOrderStatusAsync_SubOrderDoesNotExist_ShouldThrowNotFoundException()
        {
            // Arrange
            var subOrderId = Guid.NewGuid();
            var updateCustomerSubOrderStatusDto = new UpdateCustomerSubOrderStatusDto
            {
                Status = OrderStatus.Completed
            };

            _unitOfWorkMock.Setup(u => u.SubOrder.GetByIdWithDetailsAsync(subOrderId, It.IsAny<CancellationToken>()))
                .ReturnsAsync((SubOrder?)null);

            // Act
            Func<Task> act = async () => await _customerOrderService.UpdateCustomerSubOrderStatusAsync(It.IsAny<string>(), subOrderId, updateCustomerSubOrderStatusDto);
            // Assert
            await act.Should().ThrowAsync<NotFoundException>()
                .WithMessage($"Sub-order with ID {subOrderId} not found.");
        }

        [Fact]
        public async Task UpdateCustomerSubOrderStatusAsync_SubOrderDoesNotBelongToUser_ShouldThrowForbiddenAccessException()
        {
            // Arrange
            var differentUserId = "different-user-id";
            var updateCustomerSubOrderStatusDto = new UpdateCustomerSubOrderStatusDto
            {
                Status = OrderStatus.Completed
            };

            var subOrder = new SubOrder
            {
                Id = subOrderId,
                Order = new Order
                {
                    UserId = differentUserId
                }
            };

            _unitOfWorkMock.Setup(u => u.SubOrder.GetByIdWithDetailsAsync(subOrderId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(subOrder);

            // Act
            Func<Task> act = async () => await _customerOrderService.UpdateCustomerSubOrderStatusAsync(customerId, subOrderId, updateCustomerSubOrderStatusDto);

            // Assert
            await act.Should().ThrowAsync<ForbiddenAccessException>()
                .WithMessage("You don't have permission to update this order.");
        }

        [Theory]
        [MemberData(nameof(MultiProductOrderData))]
        public async Task UpdateCustomerSubOrderStatus_ToCompleted_ShouldCalculateTotalSoldCorrectly(int[] productAQuantities, int[]? productBQuantities)
        {
            // Arrange
            var productA = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Product A",
                TotalSold = 0
            };

            var productB = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Product B",
                TotalSold = 0
            };

            var variantA = new ProductVariant
            {
                ProductId = productA.Id,
                Product = productA
            };

            var variantB = new ProductVariant
            {
                ProductId = productB.Id,
                Product = productB
            };


            var orderItems = new List<OrderItem>();

            foreach (var q in productAQuantities)
            {
                orderItems.Add(new OrderItem
                {
                    Quantity = q,
                    ProductVariant = variantA
                });
            }

            foreach (var q in productBQuantities)
            {
                orderItems.Add(new OrderItem
                {
                    Quantity = q,
                    ProductVariant = variantB
                });
            }

            var storeTransfer = new StoreTransfer
            {
                Amount = 900000,
            };

            var subOrder = new SubOrder
            {
                Id = subOrderId,
                Status = OrderStatus.Shipped,
                TotalAmount = 1000000,
                Store = new Store { StripeConnectAccountId = stripeAccountId, CommissionRate = 10 },
                Order = new Order
                {
                    UserId = customerId,
                    Payment = new Payment { PaymentIntentId = paymentIntentId, Currency = currency }
                },
                OrderItems = orderItems,
                StoreTransfers = new List<StoreTransfer> { storeTransfer },
                StatusHistory = new List<OrderStatusHistory>()
            };

            var updateCustomerSubOrderStatusDto = new UpdateCustomerSubOrderStatusDto
            {
                Status = OrderStatus.Completed
            };

            _unitOfWorkMock.Setup(u => u.SubOrder.GetByIdWithDetailsAsync(subOrderId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(subOrder);

            _stripeServiceMock.Setup(s => s.GetPaymentIntentAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                       .ReturnsAsync(new Stripe.PaymentIntent { LatestChargeId = chargeId });

            _stripeServiceMock.Setup(s => s.CreateTransferAsync(
                It.IsAny<string>(),
                It.IsAny<decimal>(),
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<Dictionary<string, string>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Stripe.Transfer { Id = stripeTransferId });

            // Act
            await _customerOrderService.UpdateCustomerSubOrderStatusAsync(customerId, subOrderId, updateCustomerSubOrderStatusDto);

            // Assert
            productA.TotalSold.Should().Be(productAQuantities.Sum());
            productB.TotalSold.Should().Be(productBQuantities.Sum());
        }


        public static IEnumerable<object[]> MultiProductOrderData =>
            new List<object[]>
            {
                new object[]
                {
                    // Product A
                    new int[] { 1 },

                    // Product B
                    new int[] { 1 }
                },
                new object[]
                {
                    // Product A
                    new int[] { 2, 3 },
                    // Product B
                    new int[] { 1, 4 }
                },
            };
    }
}
