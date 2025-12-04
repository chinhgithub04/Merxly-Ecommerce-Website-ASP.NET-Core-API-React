namespace merxly.Application.DTOs.Product.Update
{
    /// <summary>
    /// DTO for the response after updating basic product information.
    /// </summary>
    public record ResponseUpdateProductDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string? Description { get; init; }
        public bool IsStoreFeatured { get; init; }
        public bool IsActive { get; init; }
        public Guid CategoryId { get; init; }
    }
}