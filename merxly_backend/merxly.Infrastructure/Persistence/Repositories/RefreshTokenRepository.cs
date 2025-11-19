using merxly.Application.Interfaces.Repositories;
using merxly.Domain.Entities;

namespace merxly.Infrastructure.Persistence.Repositories
{
    public class RefreshTokenRepository : GenericRepository<RefreshToken, Guid>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(ApplicationDbContext db) : base(db)
        {
        }
    }
}
