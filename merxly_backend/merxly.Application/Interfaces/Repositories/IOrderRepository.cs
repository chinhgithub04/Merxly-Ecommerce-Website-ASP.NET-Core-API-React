using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface IOrderRepository : IGenericRepository<Order, Guid>
    {
        Task<Order?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default);
        Task<Order?> GetByOrderNumberAsync(string orderNumber, CancellationToken cancellationToken = default);
        Task<List<Order>> GetOrdersByUserIdAsync(string userId, CancellationToken cancellationToken = default);
        Task<string> GenerateOrderNumberAsync(CancellationToken cancellationToken = default);
    }
}
