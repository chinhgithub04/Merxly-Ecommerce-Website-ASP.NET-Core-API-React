using AutoMapper;
using merxly.Application.Interfaces.Services;

namespace merxly.Application.Mappings.ValueResolvers
{
    public class MediumImageUrlResolver<TSource, TDestination> : IMemberValueResolver<TSource, TDestination, string?, string?>
    {
        private readonly ICloudinaryUrlService _cloudinaryUrlService;

        public MediumImageUrlResolver(ICloudinaryUrlService cloudinaryUrlService)
        {
            _cloudinaryUrlService = cloudinaryUrlService;
        }

        public string? Resolve(TSource source, TDestination destination, string? sourceMember, string? destMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(sourceMember))
                return null;

            return _cloudinaryUrlService.GetMediumImageUrl(sourceMember);
        }
    }
}
