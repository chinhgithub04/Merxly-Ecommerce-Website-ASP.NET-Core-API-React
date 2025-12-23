namespace merxly.Application.DTOs.ProductVariantAttributeValue
{
    public record ProductVariantAttributeValueDto
    {
        public Guid ProductVariantId { get; init; }
        public Guid ProductAttributeValueId { get; init; }
        public string Value { get; init; }
        public int DisplayOrder { get; init; }
    }
}
