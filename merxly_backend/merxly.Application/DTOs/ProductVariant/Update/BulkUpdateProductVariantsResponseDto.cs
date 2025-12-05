namespace merxly.Application.DTOs.ProductVariant.Update
{
    public record BulkUpdateProductVariantsResponseDto
    {
        public Guid ProductId { get; init; }
        public decimal NewMinPrice { get; init; }
        public decimal NewMaxPrice { get; init; }
        public int NewTotalStock { get; init; }
        public List<ResponseUpdateVariantItemDto> UpdatedVariants { get; init; }
    }
}