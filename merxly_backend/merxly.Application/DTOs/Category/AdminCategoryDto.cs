namespace merxly.Application.DTOs.Category
{
    /// <summary>
    /// Category DTO for admin panel with full details including nested hierarchy
    /// </summary>
    public record AdminCategoryDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string? Description { get; init; }
        public string? ImagePublicId { get; init; }
        public Guid? ParentCategoryId { get; init; }
        public bool IsActive { get; init; }
        public List<AdminCategoryDto> Children { get; init; } = new();
    }
}
