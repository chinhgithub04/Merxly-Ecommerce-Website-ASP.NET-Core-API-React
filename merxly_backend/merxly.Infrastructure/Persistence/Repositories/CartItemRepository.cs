using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class CartItemRepository : GenericRepository<CartItem, Guid>, ICartItemRepository
    {
        public CartItemRepository(ApplicationDbContext db) : base(db)
        {
        }

        public Task<CartItem?> GetCartItemByVariantAsync(Guid cartId, Guid productVariantId, CancellationToken cancellationToken = default)
        {
            return _dbSet
                .FirstOrDefaultAsync(ci => ci.CartId == cartId && ci.ProductVariantId == productVariantId, cancellationToken);
        }
    }
}
