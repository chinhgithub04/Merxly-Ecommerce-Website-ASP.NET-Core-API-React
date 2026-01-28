using merxly.Application.Interfaces.Repositories;
using merxly.Application.Projections.Checkout;
using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class ProductVariantRepository : GenericRepository<ProductVariant, Guid>, IProductVariantRepository
    {
        public ProductVariantRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<string?> GetMainMediaIdByProductVariantIdAsync(Guid productVariantId, CancellationToken cancellationToken = default)
        {
            var productVariant = await _dbSet
                .Include(pv => pv.Media)
                .FirstOrDefaultAsync(pv => pv.Id == productVariantId, cancellationToken);

            var mainMedia = productVariant?.Media.FirstOrDefault(m => m.IsMain);
            return mainMedia?.MediaPublicId;
        }

        public async Task<IReadOnlyCollection<ProductVariantCheckoutInfo>> GetVariantsForCheckoutAsync(IEnumerable<Guid> productVariantIds, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .AsNoTracking()
                .Where(pv => productVariantIds.Contains(pv.Id))
                .Select(pv => new ProductVariantCheckoutInfo
                {
                    VariantId = pv.Id,
                    Price = pv.Price,
                    StockQuantity = pv.StockQuantity,
                    VariantIsActive = pv.IsActive,
                    ProductId = pv.ProductId,
                    ProductIsActive = pv.Product.IsActive,
                    StoreId = pv.Product.StoreId,
                    StoreIsActive = pv.Product.Store.IsActive,
                    CommissionRate = pv.Product.Store.CommissionRate
                })
                .ToListAsync(cancellationToken);
        }
    }
}
