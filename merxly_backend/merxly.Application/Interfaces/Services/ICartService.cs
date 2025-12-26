using merxly.Application.DTOs.Cart;

namespace merxly.Application.Interfaces.Services
{
    public interface ICartService
    {
        Task<CartDto> GetCartAsync(string userId, CancellationToken cancellationToken = default);
        Task<CartDto> AddToCartAsync(string userId, AddToCartDto dto, CancellationToken cancellationToken = default);
        Task<CartDto> UpdateCartItemAsync(string userId, Guid cartItemId, UpdateCartItemDto dto, CancellationToken cancellationToken = default);
        Task RemoveCartItemAsync(string userId, Guid cartItemId, CancellationToken cancellationToken = default);
        Task ClearCartAsync(string userId, CancellationToken cancellationToken = default);
    }
}
