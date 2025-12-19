using merxly.Domain.Enums;

namespace merxly.Application.DTOs.ProductVariantMedia
{
    public record ProductVariantMediaDto
    {
        public Guid Id { get; init; }
        public string MediaPublicId { get; init; }
        public string FileName { get; init; }
        public string FileExtension { get; init; }
        public long? FileSizeInBytes { get; init; }
        public MediaType MediaType { get; init; }
        public int DisplayOrder { get; init; }
        public bool IsMain { get; init; }
    }
}