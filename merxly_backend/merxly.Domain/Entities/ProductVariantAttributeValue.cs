namespace merxly.Domain.Entities
{
    public class ProductVariantAttributeValue
    {
        public Guid ProductVariantId { get; set; }
        public Guid ProductAttributeValueId { get; set; }

        // Navigation properties
        public ProductVariant ProductVariant { get; set; }
        public ProductAttributeValue ProductAttributeValue { get; set; }
    }
}
