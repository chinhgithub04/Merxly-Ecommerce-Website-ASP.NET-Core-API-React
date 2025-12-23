using merxly.Application.DTOs.ProductVariantAttributeValue;
using merxly.Application.DTOs.ProductVariantMedia;

namespace merxly.Application.DTOs.ProductVariant
{
    public record ProductVariantForCustomerDto
    {
        public Guid Id { get; init; }
        public string? SKU { get; init; }
        public decimal Price { get; init; }
        public int StockQuantity { get; init; }
        public bool IsActive { get; init; }
        public List<ProductVariantAttributeValueDto> ProductAttributeValues { get; init; } = new();
        public List<ProductVariantMediaDto> ProductVariantMedia { get; init; } = new();
    }
}
