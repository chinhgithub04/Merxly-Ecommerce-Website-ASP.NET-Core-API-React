using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface IOrderStatusHistoryRepository : IGenericRepository<OrderStatusHistory, Guid>
    {
        Task<List<OrderStatusHistory>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default);
        Task AddRangeAsync(List<OrderStatusHistory> histories, CancellationToken cancellationToken = default);
    }
}
