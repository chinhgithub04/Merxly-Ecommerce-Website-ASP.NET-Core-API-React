using AutoMapper;
using merxly.Application.DTOs.Cart;
using merxly.Application.DTOs.Category;
using merxly.Application.DTOs.Common;
using merxly.Application.Interfaces;
using merxly.Application.Interfaces.Services;
using merxly.Domain.Entities;
using merxly.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace merxly.Application.Services
{
    public class CartService : ICartService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<CartService> _logger;

        public CartService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CartService> logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<CartDto> AddToCartAsync(string userId, AddToCartDto dto, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Adding product variant {VariantId} to cart for user: {UserId}", dto.ProductVariantId, userId);

            var cart = await _unitOfWork.Cart.GetCartWithItemsByUserIdAsync(userId, cancellationToken);
            if (cart == null)
            {
                _logger.LogInformation("No cart found for user: {UserId}. Creating a new cart.", userId);
                cart = new Cart
                {
                    UserId = userId,
                };
                await _unitOfWork.Cart.AddAsync(cart, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("New cart created for user: {UserId} with ID: {CartId}", userId, cart.Id);
            }

            // Check if the product variant exists and is active
            var productVariant = await _unitOfWork.ProductVariant.GetByIdAsync(dto.ProductVariantId, cancellationToken);
            if (productVariant == null || !productVariant.IsActive)
            {
                _logger.LogWarning("Product variant {VariantId} not found or inactive", dto.ProductVariantId);
                throw new NotFoundException($"Product variant with ID {dto.ProductVariantId} not found or is not available");
            }

            // Check if the cart item already exists
            var cartItem = await _unitOfWork.CartItem.GetCartItemByVariantAsync(cart.Id, dto.ProductVariantId, cancellationToken);
            if (cartItem != null)
            {
                _logger.LogInformation("Cart item for product variant {VariantId} already exists in cart. Updating quantity.", dto.ProductVariantId);
                cartItem.Quantity += dto.Quantity;
                _unitOfWork.CartItem.Update(cartItem);
            }
            else
            {
                // Check if adding this item would exceed stock
                if (dto.Quantity > productVariant.StockQuantity)
                {
                    _logger.LogWarning("Cannot add product variant {VariantId} to cart. Requested quantity {RequestedQty} exceeds stock {StockQty}", dto.ProductVariantId, dto.Quantity, productVariant.StockQuantity);
                    throw new InvalidOperationException($"Cannot add {dto.Quantity} items to cart. Only {productVariant.StockQuantity} items in stock.");
                }

                // Create new cart item
                _logger.LogInformation("Creating new cart item for product variant {VariantId}", dto.ProductVariantId);
                cartItem = new CartItem
                {
                    CartId = cart.Id,
                    PriceAtAdd = productVariant.Price,
                    ProductVariantId = dto.ProductVariantId,
                    Quantity = dto.Quantity
                };
                await _unitOfWork.CartItem.AddAsync(cartItem, cancellationToken);
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Product variant {VariantId} added to cart for user: {UserId}", dto.ProductVariantId, userId);
            var cartDto = _mapper.Map<CartDto>(cart);
            return cartDto;

        }

        public async Task ClearCartAsync(string userId, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Clearing cart for user: {UserId}", userId);

            var cart = await _unitOfWork.Cart.GetCartWithItemsByUserIdAsync(userId, cancellationToken);
            if (cart == null)
            {
                _logger.LogWarning("Cart not found for user: {UserId}", userId);
                throw new NotFoundException($"Cart not found for user {userId}");
            }

            if (cart.CartItems.Any())
            {
                _unitOfWork.CartItem.RemoveRange(cart.CartItems);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                _logger.LogInformation("Cart cleared successfully for user: {UserId}. Removed {ItemCount} items", userId, cart.CartItems.Count);
            }
            else
            {
                _logger.LogInformation("Cart is already empty for user: {UserId}", userId);
            }
        }

        public async Task<CartDto> GetCartAsync(string userId, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Retrieving cart for user: {UserId}", userId);

            var cart = await _unitOfWork.Cart.GetCartWithItemsByUserIdAsync(userId, cancellationToken);
            if (cart == null)
            {
                _logger.LogInformation("No cart found for user: {UserId}. Creating a new cart.", userId);
                cart = new Cart
                {
                    UserId = userId,
                };
                await _unitOfWork.Cart.AddAsync(cart, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("New cart created for user: {UserId} with ID: {CartId}", userId, cart.Id);
            }

            var cartDto = _mapper.Map<CartDto>(cart);
            _logger.LogInformation("Successfully retrieved cart for user: {UserId} with {ItemCount} items", userId, cartDto.TotalItems);

            return cartDto;
        }

        public async Task RemoveCartItemAsync(string userId, Guid cartItemId, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Removing cart item {CartItemId} for user: {UserId}", cartItemId, userId);

            var cart = await _unitOfWork.Cart.GetCartWithItemsByUserIdAsync(userId, cancellationToken);
            if (cart == null)
            {
                _logger.LogWarning("Cart not found for user: {UserId}", userId);
                throw new NotFoundException($"Cart not found for user {userId}");
            }

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
            if (cartItem == null)
            {
                _logger.LogWarning("Cart item {CartItemId} not found in cart for user: {UserId}", cartItemId, userId);
                throw new NotFoundException($"Cart item with ID {cartItemId} not found");
            }

            _unitOfWork.CartItem.Remove(cartItem);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Cart item {CartItemId} removed successfully for user: {UserId}", cartItemId, userId);
        }

        public async Task<CartDto> UpdateCartItemAsync(string userId, Guid cartItemId, UpdateCartItemDto dto, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Updating cart item {CartItemId} for user: {UserId}", cartItemId, userId);

            var cart = await _unitOfWork.Cart.GetCartWithItemsByUserIdAsync(userId, cancellationToken);
            if (cart == null)
            {
                _logger.LogWarning("Cart not found for user: {UserId}", userId);
                throw new NotFoundException($"Cart not found for user {userId}");
            }

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
            if (cartItem == null)
            {
                _logger.LogWarning("Cart item {CartItemId} not found in cart for user: {UserId}", cartItemId, userId);
                throw new NotFoundException($"Cart item with ID {cartItemId} not found");
            }

            // Get the product variant to check stock
            var productVariant = await _unitOfWork.ProductVariant.GetByIdAsync(cartItem.ProductVariantId, cancellationToken);
            if (productVariant == null || !productVariant.IsActive)
            {
                _logger.LogWarning("Product variant {VariantId} not found or inactive", cartItem.ProductVariantId);
                throw new NotFoundException($"Product variant not found or is not available");
            }

            // Check if the requested quantity exceeds stock
            if (dto.Quantity > productVariant.StockQuantity)
            {
                _logger.LogWarning("Cannot update cart item {CartItemId}. Requested quantity {RequestedQty} exceeds stock {StockQty}", cartItemId, dto.Quantity, productVariant.StockQuantity);
                throw new InvalidOperationException($"Cannot update to {dto.Quantity} items. Only {productVariant.StockQuantity} items in stock.");
            }

            cartItem.Quantity = dto.Quantity;
            _unitOfWork.CartItem.Update(cartItem);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Cart item {CartItemId} updated successfully for user: {UserId}", cartItemId, userId);

            // Refresh cart with updated data
            cart = await _unitOfWork.Cart.GetCartWithItemsByUserIdAsync(userId, cancellationToken);
            var cartDto = _mapper.Map<CartDto>(cart!);
            return cartDto;
        }
    }
}
