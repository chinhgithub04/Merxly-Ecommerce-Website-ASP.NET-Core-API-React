using merxly.Application.DTOs.ProductAttribute;
using merxly.Application.DTOs.ProductVariant;

namespace merxly.Application.DTOs.Product
{
    public record DetailProductDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string? Description { get; init; }
        public bool IsStoreFeatured { get; init; }
        public bool IsPlatformFeatured { get; init; }
        public bool IsActive { get; init; }
        public double AverageRating { get; init; }
        public int ReviewCount { get; init; }
        public int TotalSold { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime? UpdatedAt { get; init; }

        // Category Info
        public Guid CategoryId { get; init; }
        public string CategoryName { get; init; }

        // Store Info
        public Guid StoreId { get; init; }
        public string StoreName { get; init; }
        public string StoreLogoPublicId { get; init; }
        public bool StoreIsVerified { get; init; }

        // Product Attributes
        public List<ProductAttributeDto> ProductAttributes { get; init; } = new();

        // Variants
        public List<ProductVariantForCustomerDto> Variants { get; init; } = new();
    }
}
