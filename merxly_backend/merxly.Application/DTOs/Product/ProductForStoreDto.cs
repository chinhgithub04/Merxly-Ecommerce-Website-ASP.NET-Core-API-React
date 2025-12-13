namespace merxly.Application.DTOs.Product
{
    public record ProductForStoreDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public bool IsStoreFeatured { get; init; }
        public bool IsActive { get; init; }
        public int TotalStock { get; init; }
        public int TotalVariants { get; init; }
        public string? MainMediaUrl { get; init; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}