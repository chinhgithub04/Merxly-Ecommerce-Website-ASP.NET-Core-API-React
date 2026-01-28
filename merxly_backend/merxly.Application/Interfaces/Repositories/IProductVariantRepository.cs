using merxly.Application.Projections.Checkout;
using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface IProductVariantRepository : IGenericRepository<ProductVariant, Guid>
    {
        Task<string?> GetMainMediaIdByProductVariantIdAsync(Guid productVariantId, CancellationToken cancellationToken = default);
        Task<IReadOnlyCollection<ProductVariantCheckoutInfo>> GetVariantsForCheckoutAsync(IEnumerable<Guid> productVariantIds, CancellationToken cancellationToken = default);
    }
}
