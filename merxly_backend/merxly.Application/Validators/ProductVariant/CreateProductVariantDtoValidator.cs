using FluentValidation;
using merxly.Application.DTOs.ProductVariant;
using merxly.Application.Validators.ProductVariantMedia;

namespace merxly.Application.Validators.ProductVariant
{
    public class CreateProductVariantDtoValidator : AbstractValidator<CreateProductVariantDto>
    {
        public CreateProductVariantDtoValidator()
        {
            RuleFor(x => x.SKU)
                .MaximumLength(100).WithMessage("SKU cannot exceed 100 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.SKU));

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Price must be non-negative.");

            RuleFor(x => x.StockQuantity)
                .GreaterThanOrEqualTo(0).WithMessage("Stock quantity must be non-negative.");

            RuleFor(x => x.AttributeSelections)
                .NotEmpty().WithMessage("At least one attribute selection is required.");

            RuleForEach(x => x.AttributeSelections)
                .SetValidator(new ProductVariantAttributeSelectionDtoValidator());

            RuleForEach(x => x.Media)
                .SetValidator(new CreateProductVariantMediaDtoValidator());
        }
    }
}
