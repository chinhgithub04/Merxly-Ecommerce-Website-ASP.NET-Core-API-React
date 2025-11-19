using merxly.Domain.Entities;

namespace merxly.Application.Interfaces.Repositories
{
    public interface IRefreshTokenRepository : IGenericRepository<RefreshToken, Guid>
    {
    }
}
