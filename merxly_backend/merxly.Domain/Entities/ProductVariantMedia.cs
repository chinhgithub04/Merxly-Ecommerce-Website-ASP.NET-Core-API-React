using merxly.Domain.Enums;
using merxly.Domain.Interfaces;

namespace merxly.Domain.Entities
{
    public class ProductVariantMedia : ICreatedDate, IModifiedDate
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public MediaType MediaType { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsMain { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }

        // Foreign Keys
        public Guid ProductVariantId { get; set; }

        // Navigation properties
        public ProductVariant ProductVariant { get; set; }
    }
}
