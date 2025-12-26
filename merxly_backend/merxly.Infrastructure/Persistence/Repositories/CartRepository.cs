using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class CartRepository : GenericRepository<Cart, Guid>, ICartRepository
    {
        public CartRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<Cart?> GetCartByUserIdAsync(string userId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);
        }

        public async Task<Cart?> GetCartWithItemsByUserIdAsync(string userId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Media)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.ProductVariant)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.VariantAttributeValues)
                            .ThenInclude(vav => vav.ProductAttributeValue)
                                .ThenInclude(pav => pav.ProductAttribute)
                .FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);
        }
    }
}

