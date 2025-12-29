namespace merxly.Application.DTOs.Order
{
    public class ShippingAddressDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string AddressLine { get; set; }
        public string CityName { get; set; }
        public string WardName { get; set; }
        public string PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
