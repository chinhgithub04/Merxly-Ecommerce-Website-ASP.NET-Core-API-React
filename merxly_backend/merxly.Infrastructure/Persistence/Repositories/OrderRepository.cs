using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;
using merxly.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class OrderRepository : GenericRepository<Order, Guid>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<Order?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(o => o.SubOrders)
                    .ThenInclude(so => so.Store)
                .Include(o => o.SubOrders)
                    .ThenInclude(so => so.OrderItems)
                        .ThenInclude(oi => oi.ProductVariant)
                            .ThenInclude(pv => pv.Product)
                .Include(o => o.SubOrders)
                    .ThenInclude(so => so.OrderItems)
                        .ThenInclude(oi => oi.ProductVariant)
                            .ThenInclude(pv => pv.VariantAttributeValues)
                                .ThenInclude(vav => vav.ProductAttributeValue)
                .Include(o => o.ShippingAddress)
                .Include(o => o.Payment)
                .Include(o => o.SubOrders)
                    .ThenInclude(so => so.StatusHistory)
                .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
        }

        public async Task<Order?> GetByOrderNumberAsync(string orderNumber, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .FirstOrDefaultAsync(o => o.OrderNumber == orderNumber, cancellationToken);
        }

        public async Task<List<Order>> GetOrdersByUserIdAsync(string userId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(o => o.UserId == userId)
                .Include(o => o.SubOrders)
                .Include(o => o.Payment)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync(cancellationToken);
        }

        public async Task<string> GenerateOrderNumberAsync(CancellationToken cancellationToken = default)
        {
            // Generate order number in format: ORD-YYYYMMDD-XXXXX
            var today = DateTime.UtcNow;
            var prefix = $"ORD-{today:yyyyMMdd}";

            var lastOrder = await _dbSet
                .Where(o => o.OrderNumber.StartsWith(prefix))
                .OrderByDescending(o => o.OrderNumber)
                .FirstOrDefaultAsync(cancellationToken);

            if (lastOrder == null)
            {
                return $"{prefix}-00001";
            }

            var lastNumber = int.Parse(lastOrder.OrderNumber.Split('-').Last());
            var newNumber = lastNumber + 1;
            return $"{prefix}-{newNumber:D5}";
        }
    }
}
