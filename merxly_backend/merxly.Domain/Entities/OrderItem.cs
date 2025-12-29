using merxly.Domain.Interfaces;

namespace merxly.Domain.Entities
{
    public class OrderItem : ICreatedDate
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }

        // Foreign Keys
        public Guid SubOrderId { get; set; }
        public Guid? ProductVariantId { get; set; }
        public Guid StoreId { get; set; }

        // Navigation properties
        public SubOrder SubOrder { get; set; }
        public ProductVariant? ProductVariant { get; set; }
        public Store Store { get; set; }
    }
}
