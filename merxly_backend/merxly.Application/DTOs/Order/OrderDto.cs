namespace merxly.Application.DTOs.Order
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string OrderNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string UserId { get; set; }
        public Guid ShippingAddressId { get; set; }
        public ShippingAddressDto ShippingAddress { get; set; }
        public List<SubOrderDto> SubOrders { get; set; } = new List<SubOrderDto>();
        public PaymentDto? Payment { get; set; }
    }
}
