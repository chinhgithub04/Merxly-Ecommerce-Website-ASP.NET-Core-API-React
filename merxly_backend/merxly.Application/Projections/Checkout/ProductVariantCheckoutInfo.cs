namespace merxly.Application.Projections.Checkout
{
    public sealed class ProductVariantCheckoutInfo
    {
        public Guid VariantId { get; init; }
        public decimal Price { get; init; }
        public int StockQuantity { get; init; }
        public bool VariantIsActive { get; init; }

        public Guid ProductId { get; init; }
        public bool ProductIsActive { get; init; }

        public Guid StoreId { get; init; }
        public bool StoreIsActive { get; init; }
        public decimal CommissionRate { get; init; }
    }
}
