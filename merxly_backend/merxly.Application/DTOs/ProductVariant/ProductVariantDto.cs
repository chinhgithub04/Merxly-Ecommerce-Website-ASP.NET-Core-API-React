using merxly.Application.DTOs.ProductAttributeValue;
using merxly.Application.DTOs.ProductVariantMedia;

namespace merxly.Application.DTOs.ProductVariant
{
    public record ProductVariantDto
    {
        public Guid Id { get; init; }
        public string? MainImageUrl { get; init; }
        public string? SKU { get; init; }
        public decimal Price { get; init; }
        public int StockQuantity { get; init; }
        public bool IsActive { get; init; }
        public List<ProductAttributeValueDto> ProductAttributeValues { get; init; } = new();
        public List<ProductVariantMediaDto> ProductVariantMedia { get; init; } = new();
    }
}
