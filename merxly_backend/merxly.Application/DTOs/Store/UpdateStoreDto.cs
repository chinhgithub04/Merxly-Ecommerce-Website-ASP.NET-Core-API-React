namespace merxly.Application.DTOs.Store
{
    public record UpdateStoreDto
    {
        public string? StoreName { get; init; }
        public string? Description { get; init; }
        public string? LogoImagePublicId { get; init; }
        public string? BannerImagePublicId { get; init; }
        public string? Email { get; init; }
        public string? PhoneNumber { get; init; }
        public string? Website { get; init; }
        public bool? IsActive { get; init; }
    }
}
