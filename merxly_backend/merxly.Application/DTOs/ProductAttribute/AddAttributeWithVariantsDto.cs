using merxly.Application.DTOs.ProductVariant;

namespace merxly.Application.DTOs.ProductAttribute
{
    public record AddAttributeWithVariantsDto
    {
        public List<CreateProductAttributeDto> ProductAttributes { get; init; } = new();
        public List<CreateProductVariantDto> ProductAttributeValues { get; init; } = new();
    }
}