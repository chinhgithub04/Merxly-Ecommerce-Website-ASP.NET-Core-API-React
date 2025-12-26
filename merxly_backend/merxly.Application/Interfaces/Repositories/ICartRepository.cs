using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface ICartRepository : IGenericRepository<Cart, Guid>
    {
        Task<Cart?> GetCartByUserIdAsync(string userId, CancellationToken cancellationToken = default);
        Task<Cart?> GetCartWithItemsByUserIdAsync(string userId, CancellationToken cancellationToken = default);
    }
}
