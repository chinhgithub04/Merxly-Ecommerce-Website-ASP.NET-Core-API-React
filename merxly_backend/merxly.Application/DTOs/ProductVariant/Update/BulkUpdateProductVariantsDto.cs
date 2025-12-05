namespace merxly.Application.DTOs.ProductVariant.Update
{
    public record BulkUpdateProductVariantsDto
    {
        public List<BulkUpdateVariantItemDto> Variants { get; init; } = new();
    }
}