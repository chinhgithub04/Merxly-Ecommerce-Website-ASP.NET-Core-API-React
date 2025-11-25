namespace merxly.Application.DTOs.Category
{
    
    public record CreateCategoryDto
    {
        public string Name { get; init; }
        public string? Description { get; init; }
        public string? ImagePublicId { get; init; }
        public Guid? ParentCategoryId { get; init; }
    }
}
