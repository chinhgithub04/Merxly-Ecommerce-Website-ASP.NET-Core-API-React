using merxly.Domain.Enums;

namespace merxly.Application.DTOs.Order
{
    public class SubOrderDto
    {
        public Guid Id { get; set; }
        public string SubOrderNumber { get; set; }
        public OrderStatus Status { get; set; }
        public decimal SubTotal { get; set; }
        public decimal? Tax { get; set; }
        public decimal? ShippingCost { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Carrier { get; set; }
        public string? TrackingNumber { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public Guid OrderId { get; set; }
        public Guid StoreId { get; set; }
        public string StoreName { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
    }
}
