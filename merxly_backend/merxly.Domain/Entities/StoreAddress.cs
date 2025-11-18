using merxly.Domain.Interfaces;

namespace merxly.Domain.Entities
{
    public class StoreAddress : ICreatedDate, IModifiedDate
    {
        public Guid Id { get; set; }
        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public string PostalCode { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }

        // Foreign Keys
        public Guid StoreId { get; set; }

        // Navigation properties
        public Store Store { get; set; }
    }
}
