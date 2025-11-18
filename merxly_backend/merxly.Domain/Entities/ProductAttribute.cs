using merxly.Domain.Enums;

namespace merxly.Domain.Entities
{
    public class ProductAttribute
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public ProductAttributeDisplayType ProductAttributeDisplayType { get; set; }
        public int DisplayOrder { get; set; }

        // Navigation properties
        public ICollection<ProductAttributeValue> ProductAttributeValues { get; set; } = new List<ProductAttributeValue>();
    }
}
