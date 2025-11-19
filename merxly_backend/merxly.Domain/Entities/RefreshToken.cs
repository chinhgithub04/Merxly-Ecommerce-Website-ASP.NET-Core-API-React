using merxly.Domain.Interfaces;

namespace merxly.Domain.Entities
{
    public class RefreshToken : ICreatedDate
    {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? RevokedAt { get; set; }

        // Foreign Key
        public string UserId { get; set; }

        // Navigation property
        public ApplicationUser User { get; set; }

        // Helper properties
        public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
        public bool IsRevoked => RevokedAt != null;
        public bool IsActive => !IsRevoked && !IsExpired;
    }
}
