namespace merxly.Application.DTOs.Cart
{
    public class CartDto
    {
        public Guid Id { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new();
        public int TotalItems { get; set; }
        public decimal Subtotal { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
