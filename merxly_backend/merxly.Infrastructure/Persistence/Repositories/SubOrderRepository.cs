using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;
using merxly.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class SubOrderRepository : GenericRepository<SubOrder, Guid>, ISubOrderRepository
    {
        public SubOrderRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<SubOrder?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(so => so.Order)
                    .ThenInclude(o => o.ShippingAddress)
                .Include(so => so.Store)
                .Include(so => so.OrderItems)
                    .ThenInclude(oi => oi.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                .Include(so => so.OrderItems)
                    .ThenInclude(oi => oi.ProductVariant)
                        .ThenInclude(pv => pv.VariantAttributeValues)
                            .ThenInclude(vav => vav.ProductAttributeValue)
                .Include(so => so.StatusHistory)
                .Include(so => so.StoreTransfers)
                .FirstOrDefaultAsync(so => so.Id == id, cancellationToken);
        }

        public async Task<SubOrder?> GetBySubOrderNumberAsync(string subOrderNumber, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .FirstOrDefaultAsync(so => so.SubOrderNumber == subOrderNumber, cancellationToken);
        }

        public async Task<List<SubOrder>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(so => so.OrderId == orderId)
                .Include(so => so.Store)
                .Include(so => so.OrderItems)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<SubOrder>> GetByStoreIdAsync(Guid storeId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(so => so.StoreId == storeId)
                .Include(so => so.Order)
                .Include(so => so.OrderItems)
                .OrderByDescending(so => so.CreatedAt)
                .ToListAsync(cancellationToken);
        }

        public async Task AddRangeAsync(List<SubOrder> subOrders, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddRangeAsync(subOrders, cancellationToken);
        }
    }
}
