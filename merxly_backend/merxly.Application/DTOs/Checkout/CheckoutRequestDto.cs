namespace merxly.Application.DTOs.Checkout
{
    public class CheckoutRequestDto
    {
        public List<CheckoutItemDto> Items { get; set; } = new List<CheckoutItemDto>();
        public Guid ShippingAddressId { get; set; }
        public string? PaymentMethodId { get; set; } // Stripe Payment Method ID (optional - can use default)
        public string? Notes { get; set; }
    }
}
