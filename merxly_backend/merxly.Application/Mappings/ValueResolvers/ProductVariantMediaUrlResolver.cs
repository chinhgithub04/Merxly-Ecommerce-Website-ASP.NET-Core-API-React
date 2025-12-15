using AutoMapper;
using merxly.Application.Interfaces.Services;
using merxly.Domain.Entities;
using merxly.Domain.Enums;

namespace merxly.Application.Mappings.ValueResolvers
{
    public class ProductVariantMediaUrlResolver : IValueResolver<ProductVariantMedia, object, string?>
    {
        private readonly ICloudinaryUrlService _cloudinaryUrlService;

        public ProductVariantMediaUrlResolver(ICloudinaryUrlService cloudinaryUrlService)
        {
            _cloudinaryUrlService = cloudinaryUrlService;
        }

        public string? Resolve(ProductVariantMedia source, object destination, string? destMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(source.MediaPublicId))
                return null;

            return source.MediaType == MediaType.Image
                ? _cloudinaryUrlService.GetThumbnailImageUrl(source.MediaPublicId)
                : _cloudinaryUrlService.GetVideoUrl(source.MediaPublicId);
        }
    }
}
