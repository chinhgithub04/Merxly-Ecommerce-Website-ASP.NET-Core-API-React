using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;
using merxly.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class OrderStatusHistoryRepository : GenericRepository<OrderStatusHistory, Guid>, IOrderStatusHistoryRepository
    {
        public OrderStatusHistoryRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<List<OrderStatusHistory>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(h => h.SubOrder)
                    .ThenInclude(so => so.Order)
                .Where(h => h.SubOrder.OrderId == orderId)
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync(cancellationToken);
        }

        public async Task AddRangeAsync(List<OrderStatusHistory> histories, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddRangeAsync(histories, cancellationToken);
        }
    }
}
