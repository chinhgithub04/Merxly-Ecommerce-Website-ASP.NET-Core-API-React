namespace merxly.Domain.Entities
{
    public class ProductAttributeValue
    {
        public Guid Id { get; set; }
        public string Value { get; set; }
        public int DisplayOrder { get; set; }
        public Guid ProductAttributeId { get; set; }

        // Navigation properties
        public ProductAttribute ProductAttribute { get; set; }
        public ICollection<ProductVariantAttributeValue> VariantAttributeValues { get; set; } = new List<ProductVariantAttributeValue>();
    }
}
