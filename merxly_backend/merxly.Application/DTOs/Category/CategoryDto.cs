namespace merxly.Application.DTOs.Category
{
    /// <summary>
    /// Get all the hierarchical categories
    /// </summary>
    public record CategoryDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public Guid? ParentCategoryId { get; init; }
        public List<CategoryDto> Children { get; init; } = new();
    }
}
