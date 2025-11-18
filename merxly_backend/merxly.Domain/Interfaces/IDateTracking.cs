namespace merxly.Domain.Interfaces
{
    public interface ICreatedDate
    {
        DateTimeOffset CreatedAt { get; set; }
    }

    public interface IModifiedDate
    {
        DateTimeOffset? UpdatedAt { get; set; }
    }
}
