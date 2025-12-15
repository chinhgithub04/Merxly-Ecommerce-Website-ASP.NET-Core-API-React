using AutoMapper;
using merxly.Application.Interfaces.Services;

namespace merxly.Application.Mappings.ValueResolvers
{
    public class ThumbnailImageUrlResolver<TSource, TDestination> : IMemberValueResolver<TSource, TDestination, string?, string?>
    {
        private readonly ICloudinaryUrlService _cloudinaryUrlService;

        public ThumbnailImageUrlResolver(ICloudinaryUrlService cloudinaryUrlService)
        {
            _cloudinaryUrlService = cloudinaryUrlService;
        }

        public string? Resolve(TSource source, TDestination destination, string? sourceMember, string? destMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(sourceMember))
                return null;

            return _cloudinaryUrlService.GetThumbnailImageUrl(sourceMember);
        }
    }
}
