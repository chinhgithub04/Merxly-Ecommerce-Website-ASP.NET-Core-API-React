namespace merxly.Application.DTOs.Category
{
    public record CategoryForStoreDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
    }
}