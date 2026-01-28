using AutoMapper;
using FluentAssertions;
using merxly.Application.DTOs.Checkout;
using merxly.Application.Interfaces;
using merxly.Application.Interfaces.Services;
using merxly.Application.Mappings;
using merxly.Application.Projections.Checkout;
using merxly.Application.Services;
using merxly.Domain.Entities;
using merxly.Domain.Exceptions;
using Microsoft.Extensions.Logging;
using Moq;

namespace merxly.Application.Tests.Services
{
    public class CheckoutServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly Mock<IStripeService> _stripeServiceMock;
        private readonly Mock<ILogger<CheckoutService>> _loggerMock;
        private readonly IMapper _mapper;
        private readonly CheckoutService _checkoutService;

        private readonly string _userId = "user-123";
        private readonly Guid[] _productVariantIds = { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid() };
        private readonly Guid _shippingAddressId = Guid.NewGuid();
        private readonly string _paymentMethodId = "pm_123";
        private readonly string _stripeCustomerId = "cus_123";
        private readonly string _clientSecret = "secret-123";

        public CheckoutServiceTests()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _unitOfWorkMock.DefaultValue = DefaultValue.Mock;
            _stripeServiceMock = new Mock<IStripeService>();
            _loggerMock = new Mock<ILogger<CheckoutService>>();

            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });
            _mapper = mapperConfig.CreateMapper();

            _checkoutService = new CheckoutService(
                _unitOfWorkMock.Object,
                _stripeServiceMock.Object,
                _mapper,
                _loggerMock.Object);

            // Happy path
            _unitOfWorkMock.Setup(u => u.ApplicationUser.GetByIdAsync(_userId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new ApplicationUser { Id = _userId, Email = "chinh@gmail.com", FirstName = "Nguyen Duc", LastName = "Chinh" });

            _unitOfWorkMock.Setup(u => u.Address.GetByIdAsync(_shippingAddressId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Address { Id = _shippingAddressId, UserId = _userId });

            var validVariants = _productVariantIds.Select(id => new ProductVariantCheckoutInfo
            {
                VariantId = id,
                VariantIsActive = true,
                ProductIsActive = true,
                StoreIsActive = true,
                StoreId = Guid.NewGuid(),
                StockQuantity = 100,
                Price = 10,
                CommissionRate = 0.1m
            }).ToList();

            _unitOfWorkMock.Setup(u => u.ProductVariant.GetVariantsForCheckoutAsync(It.IsAny<IEnumerable<Guid>>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(validVariants);

            _stripeServiceMock.Setup(s => s.CreateCustomerAsync(
                   It.IsAny<string>(),
                   It.IsAny<string>(),
                   It.IsAny<CancellationToken>()
                ))
                .ReturnsAsync(new Stripe.Customer { Id = _stripeCustomerId });

            _stripeServiceMock.Setup(s => s.CreatePaymentIntentAsync(
                    It.IsAny<string>(),
                    It.IsAny<decimal>(),
                    It.IsAny<string>(),
                    It.IsAny<string?>(),
                    It.IsAny<Dictionary<string, string>?>(),
                    It.IsAny<CancellationToken>()
                ))
                .ReturnsAsync(new Stripe.PaymentIntent { Id = "pi_123", ClientSecret = _clientSecret });

            _unitOfWorkMock.Setup(u => u.Order.GetByIdWithDetailsAsync(
                    It.IsAny<Guid>(),
                    It.IsAny<CancellationToken>()
                ))
                .ReturnsAsync(new Order());

            _unitOfWorkMock.Setup(u => u.Order.GenerateOrderNumberAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync("ORDER-12345");
        }

        private CheckoutRequestDto CreateRequest(int quantity = 1)
        {
            return new CheckoutRequestDto
            {
                ShippingAddressId = _shippingAddressId,
                PaymentMethodId = _paymentMethodId,
                Items = _productVariantIds.Select(id => new CheckoutItemDto { ProductVariantId = id, Quantity = quantity }).ToList(),
            };
        }

        [Fact]
        public async Task ProcessCheckoutAsync_UserNotFound_ShouldThrowNotFoundException()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.ApplicationUser.GetByIdAsync(_userId, It.IsAny<CancellationToken>()))
                .ReturnsAsync((ApplicationUser?)null);

            // Act
            Func<Task> act = async () => await _checkoutService.ProcessCheckoutAsync(_userId, CreateRequest(), default);
            // Assert
            await act.Should().ThrowAsync<NotFoundException>()
                .WithMessage("User not found");
        }

        [Fact]
        public async Task ProceedCheckoutAsync_ShippingAddressNotFound_ShouldThrowNotFoundException()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.Address.GetByIdAsync(_shippingAddressId, It.IsAny<CancellationToken>()))
                .ReturnsAsync((Address?)null);
            // Act
            Func<Task> act = async () => await _checkoutService.ProcessCheckoutAsync(_userId, CreateRequest(), default);
            // Assert
            await act.Should().ThrowAsync<NotFoundException>()
                .WithMessage("Shipping address not found or does not belong to user");
        }

        [Fact]
        public async Task ProcessCheckoutAsync_ShippingAddressDoesNotBelongToUser_ShouldThrowNotFoundException()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.Address.GetByIdAsync(_shippingAddressId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Address { Id = _shippingAddressId, UserId = "other-user" });
            // Act
            Func<Task> act = async () => await _checkoutService.ProcessCheckoutAsync(_userId, CreateRequest(), default);
            // Assert
            await act.Should().ThrowAsync<NotFoundException>()
                .WithMessage("Shipping address not found or does not belong to user");
        }

        [Fact]
        public async Task ProcessCheckoutAsync_AnyVariantIsMissing_ShouldThrowNotFoundException()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.ProductVariant.GetVariantsForCheckoutAsync(_productVariantIds, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<ProductVariantCheckoutInfo>());

            // Act
            Func<Task> act = async () => await _checkoutService.ProcessCheckoutAsync(_userId, CreateRequest(), default);

            // Assert
            await act.Should().ThrowAsync<NotFoundException>()
                .WithMessage("*Product variant*not found");
        }

        [Theory]
        // VariantIsActive, ProductIsActive, StoreIsActive, ExpectedErrorMessage
        [InlineData(false, true, true, "Product variant*is not active")]
        [InlineData(true, false, true, "Product*is not active")]
        [InlineData(true, true, false, "Store*is not active")]
        public async Task ProcessCheckoutAsync_InActiveVariantEntity_ShouldThrowInvalidOperationException(
            bool variantIsActive,
            bool productIsActive,
            bool storeIsActive,
            string expectedErrorMessage)
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.ProductVariant.GetVariantsForCheckoutAsync(_productVariantIds, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<ProductVariantCheckoutInfo>
                {
                    new ProductVariantCheckoutInfo
                    {
                        VariantId = _productVariantIds[0],
                        VariantIsActive = variantIsActive,
                        ProductIsActive = productIsActive,
                        StoreIsActive = storeIsActive,
                    },
                });
            // Act
            Func<Task> act = async () => await _checkoutService.ProcessCheckoutAsync(_userId, CreateRequest(), default);
            // Assert
            await act.Should().ThrowAsync<InvalidOperationException>()
                .WithMessage(expectedErrorMessage);
        }

        [Fact]
        public async Task ProcessCheckoutAsync_InsufficientStock_ShouldThrowInvalidOperationException()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.ProductVariant.GetVariantsForCheckoutAsync(_productVariantIds, It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new List<ProductVariantCheckoutInfo>
                    {
                        new ProductVariantCheckoutInfo
                        {
                            VariantId = _productVariantIds[0],
                            VariantIsActive = true,
                            ProductIsActive = true,
                            StoreIsActive = true,
                            StockQuantity = 2,
                        },
                    });

            // Act
            Func<Task> act = async () => await _checkoutService.ProcessCheckoutAsync(_userId, CreateRequest(5), default);

            // Assert
            await act.Should().ThrowAsync<InvalidOperationException>()
                .WithMessage("Insufficient stock for product variant*");
        }

        [Theory]
        // userHasStripeId, stockBefore, orderQuantity, stockAfter
        [InlineData(true, 100, 2, 98)]
        [InlineData(true, 150, 5, 145)]
        [InlineData(false, 200, 5, 195)]
        public async Task ProcessCheckoutAsync_ValidRequest_ShouldProcessCheckoutSuccessfully(bool userHasStripeId, int stockBefore, int orderQuantity, int stockAfter)
        {
            // Arrange
            var request = CreateRequest(orderQuantity);

            if (userHasStripeId)
            {
                _unitOfWorkMock.Setup(u => u.ApplicationUser.GetByIdAsync(_userId, It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new ApplicationUser { Id = _userId, StripeCustomerId = _stripeCustomerId, DefaultPaymentMethodId = _paymentMethodId });
            }

            _unitOfWorkMock.Setup(u => u.ProductVariant.GetVariantsForCheckoutAsync(_productVariantIds, It.IsAny<CancellationToken>()))
                .ReturnsAsync(_productVariantIds.Select(id => new ProductVariantCheckoutInfo
                {
                    VariantId = id,
                    VariantIsActive = true,
                    ProductIsActive = true,
                    StoreIsActive = true,
                    StockQuantity = stockBefore,
                    Price = 10,
                    CommissionRate = 0.1m
                }).ToList());

            var variants = new List<ProductVariant>
            {
                new ProductVariant { Id = _productVariantIds[0], StockQuantity = stockBefore },
                new ProductVariant { Id = _productVariantIds[1], StockQuantity = stockBefore },
                new ProductVariant { Id = _productVariantIds[2], StockQuantity = stockBefore },
            };

            _unitOfWorkMock.Setup(u => u.ProductVariant.GetByIdsAsync(_productVariantIds, It.IsAny<CancellationToken>()))
                .ReturnsAsync(variants);

            // Act
            var result = await _checkoutService.ProcessCheckoutAsync(_userId, request, default);

            // Assert
            result.Should().NotBeNull();
            result.ClientSecret.Should().Be(_clientSecret);
            result.Order.Should().NotBeNull();

            // 1. Verify stock deduction
            variants.Should().OnlyContain(v => v.StockQuantity == stockAfter);
            _unitOfWorkMock.Verify(u => u.ProductVariant.Update(It.IsAny<ProductVariant>()), Times.AtLeastOnce);

            // 2. Verify calls to create Stripe customer if user has no StripeCustomerId
            if (!userHasStripeId)
            {
                _stripeServiceMock.Verify(s => s.CreateCustomerAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()),
                Times.Once);
            }
            else
            {
                _stripeServiceMock.Verify(s => s.CreateCustomerAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()),
                Times.Never);
            }

            // 3. Verify Order creation
            _unitOfWorkMock.Verify(u => u.Order.AddAsync(
                It.IsAny<Order>(),
                It.IsAny<CancellationToken>()),
            Times.Once);

            // 4. Verify SubOrder creation
            _unitOfWorkMock.Verify(u => u.SubOrder.AddRangeAsync(
                It.IsAny<List<SubOrder>>(),
                It.IsAny<CancellationToken>()), Times.Once);

            // 5. Verify OrderItem creation
            _unitOfWorkMock.Verify(u => u.OrderItem.AddRangeAsync(
                It.IsAny<List<OrderItem>>(),
                It.IsAny<CancellationToken>()), Times.Once);

            // 6. Verify OrderStatusHistory creation
            _unitOfWorkMock.Verify(u => u.OrderStatusHistory.AddRangeAsync(
                It.IsAny<List<OrderStatusHistory>>(),
                It.IsAny<CancellationToken>()),
            Times.Once);


            // 7. Verify call to CreatePaymentIntentAsync
            _stripeServiceMock.Verify(s => s.CreatePaymentIntentAsync(
                    It.IsAny<string>(),
                    It.IsAny<decimal>(),
                    It.IsAny<string>(),
                    It.IsAny<string?>(),
                    It.IsAny<Dictionary<string, string>?>(),
                    It.IsAny<CancellationToken>()
                ), Times.Once);

            // 8. Verify Payment creation
            _unitOfWorkMock.Verify(u => u.Payment.AddAsync(
                It.IsAny<Payment>(),
                It.IsAny<CancellationToken>()), Times.Once);

            // 9. Verify StoreTransfer creation
            _unitOfWorkMock.Verify(u => u.StoreTransfer.AddRangeAsync(
                It.IsAny<List<StoreTransfer>>(),
                It.IsAny<CancellationToken>()), Times.Once);

            // 10. Verify UnitOfWork SaveChangesAsync called
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.AtLeastOnce);
        }
    }
}
