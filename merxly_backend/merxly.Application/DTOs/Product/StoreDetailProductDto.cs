using merxly.Application.DTOs.ProductAttribute;
using merxly.Application.DTOs.ProductVariant;

namespace merxly.Application.DTOs.Product
{
    public record StoreDetailProductDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string? Description { get; init; }
        public bool IsStoreFeatured { get; init; }
        public bool IsActive { get; init; }
        public double AverageRating { get; init; }
        public int ReviewCount { get; init; }
        public int TotalSold { get; init; }
        
        // Category Info
        public Guid CategoryId { get; init; }
        public string CategoryName { get; init; }
                
        // Variants
        public List<ProductAttributeDto> Attributes { get; init; } = new();
        public List<ProductVariantDto> Variants { get; init; } = new();
    }
}