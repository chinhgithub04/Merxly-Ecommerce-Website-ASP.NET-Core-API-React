using merxly.Domain.Interfaces;

namespace merxly.Domain.Entities
{
    public class Cart : ICreatedDate, IModifiedDate
    {
        public Guid Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }

        // Foreign Keys
        public string UserId { get; set; }

        // Navigation properties
        public ApplicationUser User { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
