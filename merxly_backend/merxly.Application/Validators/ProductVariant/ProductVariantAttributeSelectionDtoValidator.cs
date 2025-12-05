using FluentValidation;
using merxly.Application.DTOs.ProductVariant;

namespace merxly.Application.Validators.ProductVariant
{
    public class ProductVariantAttributeSelectionDtoValidator : AbstractValidator<ProductVariantAttributeSelectionDto>
    {
        public ProductVariantAttributeSelectionDtoValidator()
        {
            RuleFor(x => x.AttributeName)
                .NotEmpty().WithMessage("Attribute name is required.")
                .MaximumLength(100).WithMessage("Attribute name cannot exceed 100 characters.");

            RuleFor(x => x.Value)
                .NotEmpty().WithMessage("Attribute value is required.")
                .MaximumLength(200).WithMessage("Attribute value cannot exceed 200 characters.");
        }
    }
}
