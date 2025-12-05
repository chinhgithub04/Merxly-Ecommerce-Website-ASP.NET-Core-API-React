using FluentValidation;
using merxly.Application.DTOs.ProductVariantMedia;

namespace merxly.Application.Validators.ProductVariantMedia
{
    public class CreateProductVariantMediaDtoValidator : AbstractValidator<CreateProductVariantMediaDto>
    {
        public CreateProductVariantMediaDtoValidator()
        {
            RuleFor(x => x.MediaPublicId)
                .NotEmpty().WithMessage("Media public ID is required.")
                .MaximumLength(500).WithMessage("Media public ID cannot exceed 500 characters.");

            RuleFor(x => x.DisplayOrder)
                .GreaterThanOrEqualTo(0).WithMessage("Display order must be non-negative.");

            RuleFor(x => x.MediaType)
                .IsInEnum().WithMessage("Invalid media type.");
        }
    }
}
