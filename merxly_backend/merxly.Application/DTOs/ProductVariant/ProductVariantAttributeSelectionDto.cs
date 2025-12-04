namespace merxly.Application.DTOs.ProductVariant
{
    public record ProductVariantAttributeSelectionDto
    {
        public string AttributeName { get; init; }
        public string Value { get; init; }
    }
}