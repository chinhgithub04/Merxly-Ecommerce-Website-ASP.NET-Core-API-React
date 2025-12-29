using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface IPaymentRepository : IGenericRepository<Payment, Guid>
    {
        Task<Payment?> GetByPaymentIntentIdAsync(string paymentIntentId, CancellationToken cancellationToken = default);
        Task<Payment?> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default);
    }
}
