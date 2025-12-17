namespace merxly.Application.Models.FileStorage
{
    public class CustomFileUploadResult
    {
        public string PublicId { get; set; }
        public string OriginalUrl { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public long FileSizeInBytes { get; set; }
    }

}
