using AutoMapper;
using merxly.Application.Interfaces.Services;

namespace merxly.Application.Mappings.ValueResolvers
{
    public class VideoUrlResolver : IValueResolver<object, object, string?>
    {
        private readonly ICloudinaryUrlService _cloudinaryUrlService;

        public VideoUrlResolver(ICloudinaryUrlService cloudinaryUrlService)
        {
            _cloudinaryUrlService = cloudinaryUrlService;
        }

        public string? Resolve(object source, object destination, string? publicId, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(publicId))
                return null;

            return _cloudinaryUrlService.GetVideoUrl(publicId);
        }
    }
}
