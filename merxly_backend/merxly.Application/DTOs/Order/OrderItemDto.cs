namespace merxly.Application.DTOs.Order
{
    public class OrderItemDto
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public Guid? ProductVariantId { get; set; }
        public Guid StoreId { get; set; }
        public string StoreName { get; set; }
    }
}
