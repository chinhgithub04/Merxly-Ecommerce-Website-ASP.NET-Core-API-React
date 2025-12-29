using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;
using merxly.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class StoreTransferRepository : GenericRepository<StoreTransfer, Guid>, IStoreTransferRepository
    {
        public StoreTransferRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<List<StoreTransfer>> GetByPaymentIdAsync(Guid paymentId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(st => st.PaymentId == paymentId)
                .Include(st => st.Store)
                .Include(st => st.SubOrder)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<StoreTransfer>> GetByStoreIdAsync(Guid storeId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(st => st.StoreId == storeId)
                .Include(st => st.SubOrder)
                .OrderByDescending(st => st.CreatedAt)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<StoreTransfer>> GetBySubOrderIdAsync(Guid subOrderId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(st => st.SubOrderId == subOrderId)
                .Include(st => st.Store)
                .ToListAsync(cancellationToken);
        }

        public async Task AddRangeAsync(List<StoreTransfer> transfers, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddRangeAsync(transfers, cancellationToken);
        }
    }
}
