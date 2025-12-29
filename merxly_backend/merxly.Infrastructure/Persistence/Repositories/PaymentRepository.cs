using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;
using merxly.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class PaymentRepository : GenericRepository<Payment, Guid>, IPaymentRepository
    {
        public PaymentRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<Payment?> GetByPaymentIntentIdAsync(string paymentIntentId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .FirstOrDefaultAsync(p => p.PaymentIntentId == paymentIntentId, cancellationToken);
        }

        public async Task<Payment?> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .FirstOrDefaultAsync(p => p.OrderId == orderId, cancellationToken);
        }
    }
}
