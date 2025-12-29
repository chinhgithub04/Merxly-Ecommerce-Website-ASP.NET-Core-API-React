using merxly.Application.DTOs.Order;

namespace merxly.Application.DTOs.Checkout
{
    public class CheckoutResponseDto
    {
        public OrderDto Order { get; set; }
        public string ClientSecret { get; set; } // Stripe client secret for payment confirmation
    }
}
