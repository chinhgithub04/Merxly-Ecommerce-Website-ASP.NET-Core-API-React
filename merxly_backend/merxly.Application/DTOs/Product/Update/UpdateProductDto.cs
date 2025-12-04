namespace merxly.Application.DTOs.Product.Update
{
    /// <summary>
    /// DTO for updating product basic information.
    /// </summary>
    public record UpdateProductDto
    {
        public string? Name { get; init; }
        public string? Description { get; init; }
        public bool? IsStoreFeatured { get; init; }
        public bool? IsActive { get; init; }
        public Guid? CategoryId { get; init; }
    }
}
