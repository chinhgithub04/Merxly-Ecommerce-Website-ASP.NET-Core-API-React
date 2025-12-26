using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface ICartItemRepository : IGenericRepository<CartItem, Guid>
    {
        Task<CartItem?> GetCartItemByVariantAsync(Guid cartId, Guid productVariantId, CancellationToken cancellationToken = default);
    }
}
