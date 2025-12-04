using merxly.Application.DTOs.ProductVariantMedia;

namespace merxly.Application.DTOs.ProductVariant
{
    public record CreateProductVariantDto
    {
        public string? SKU { get; init; }
        public decimal Price { get; init; }
        public int StockQuantity { get; init; }
        public List<ProductVariantAttributeSelectionDto> AttributeSelections {get; init; } = new();
        public List<CreateProductVariantMediaDto> Media { get; init; } = new();
    }
}