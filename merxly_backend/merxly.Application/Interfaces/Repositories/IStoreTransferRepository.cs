using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface IStoreTransferRepository : IGenericRepository<StoreTransfer, Guid>
    {
        Task<List<StoreTransfer>> GetByPaymentIdAsync(Guid paymentId, CancellationToken cancellationToken = default);
        Task<List<StoreTransfer>> GetByStoreIdAsync(Guid storeId, CancellationToken cancellationToken = default);
        Task<List<StoreTransfer>> GetBySubOrderIdAsync(Guid subOrderId, CancellationToken cancellationToken = default);
        Task AddRangeAsync(List<StoreTransfer> transfers, CancellationToken cancellationToken = default);
    }
}
