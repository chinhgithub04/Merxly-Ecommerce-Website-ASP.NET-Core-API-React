namespace merxly.Application.DTOs.ProductVariant.Update
{
    public record ResponseUpdateVariantItemDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string? SKU { get; init; }
        public decimal Price { get; init; }
        public decimal? Weight { get; init; }
        public decimal? Length { get; init; }
        public decimal? Width { get; init; }
        public decimal? Height { get; init; }
        public int StockQuantity { get; init; }
        public bool IsActive { get; init; }
    }
}