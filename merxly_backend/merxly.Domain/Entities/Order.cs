using merxly.Domain.Interfaces;

namespace merxly.Domain.Entities
{
    public class Order : ICreatedDate, IModifiedDate
    {
        public Guid Id { get; set; }
        public string OrderNumber { get; set; } // Customer-facing order number
        public decimal TotalAmount { get; set; } // Total amount across all sub-orders
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Foreign Keys
        public string UserId { get; set; }
        public Guid ShippingAddressId { get; set; }

        // Navigation properties
        public ApplicationUser User { get; set; }
        public Address ShippingAddress { get; set; }
        public ICollection<SubOrder> SubOrders { get; set; } = new List<SubOrder>();
        public Payment? Payment { get; set; }
    }
}
