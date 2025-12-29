using merxly.Domain.Enums;
using merxly.Domain.Interfaces;

namespace merxly.Domain.Entities
{
    public class SubOrder : ICreatedDate, IModifiedDate
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
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

        // Foreign Keys
        public Guid OrderId { get; set; }
        public Guid StoreId { get; set; }

        // Navigation properties
        public Order Order { get; set; }
        public Store Store { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public ICollection<OrderStatusHistory> StatusHistory { get; set; } = new List<OrderStatusHistory>();
        public ICollection<StoreTransfer> StoreTransfers { get; set; } = new List<StoreTransfer>();
    }
}
