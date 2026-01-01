namespace merxly.Application.DTOs.Order
{
    public record StoreOrderItemDto
    {
        public Guid Id { get; init; }
        public int Quantity { get; init; }
        public decimal UnitPrice { get; init; }
        public decimal TotalPrice { get; init; }
        public Guid? ProductVariantId { get; init; }
        public string ProductVariantName { get; init; }
        public string? ProductVariantSKU { get; init; }
        public string? ProductVariantMainPublicId { get; init; }
        public Dictionary<string, string> SelectedAttributes { get; init; }
    }
}
