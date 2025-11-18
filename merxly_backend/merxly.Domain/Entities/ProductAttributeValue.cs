namespace merxly.Domain.Entities
{
    public class ProductAttributeValue
    {
        public Guid Id { get; set; }
        public string Value { get; set; }

        public Guid ProductVariantId { get; set; }
        public Guid ProductAttributeId { get; set; }

        public ProductVariant ProductVariant { get; set; }
        public ProductAttribute ProductAttribute { get; set; }
    }
}
