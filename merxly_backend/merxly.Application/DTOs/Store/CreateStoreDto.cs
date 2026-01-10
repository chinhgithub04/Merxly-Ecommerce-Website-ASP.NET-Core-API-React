namespace merxly.Application.DTOs.Store
{
    public record CreateStoreDto
    {
        public string StoreName { get; init; }
        public string? Description { get; init; }
        public string? LogoImagePublicId { get; init; }
        public string? BannerImagePublicId { get; init; }
        public string IdentityCardFrontPublicId { get; init; }
        public string IdentityCardBackPublicId { get; init; }
        public string BussinessLicensePublicId { get; init; }
        public string TaxCode { get; init; }
        public string Email { get; init; }
        public string PhoneNumber { get; init; }
        public string OwnerName { get; init; }
        public string OwnerEmail { get; init; }
        public string? OwnerPhoneNumber { get; init; }
        public string? Website { get; init; }
    }
}
