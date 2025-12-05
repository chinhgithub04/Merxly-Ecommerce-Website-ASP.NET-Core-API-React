using FluentValidation;
using merxly.Application.DTOs.ProductVariant.Update;

namespace merxly.Application.Validators.ProductVariant
{
    public class BulkUpdateVariantItemDtoValidator : AbstractValidator<BulkUpdateVariantItemDto>
    {
        public BulkUpdateVariantItemDtoValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Variant ID is required.");

            RuleFor(x => x.SKU)
                .MaximumLength(100).WithMessage("SKU cannot exceed 100 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.SKU));

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Price must be non-negative.")
                .When(x => x.Price.HasValue);

            RuleFor(x => x.Weight)
                .GreaterThanOrEqualTo(0).WithMessage("Weight must be non-negative.")
                .When(x => x.Weight.HasValue);

            RuleFor(x => x.Length)
                .GreaterThanOrEqualTo(0).WithMessage("Length must be non-negative.")
                .When(x => x.Length.HasValue);

            RuleFor(x => x.Width)
                .GreaterThanOrEqualTo(0).WithMessage("Width must be non-negative.")
                .When(x => x.Width.HasValue);

            RuleFor(x => x.Height)
                .GreaterThanOrEqualTo(0).WithMessage("Height must be non-negative.")
                .When(x => x.Height.HasValue);

            RuleFor(x => x.StockQuantity)
                .GreaterThanOrEqualTo(0).WithMessage("Stock quantity must be non-negative.")
                .When(x => x.StockQuantity.HasValue);
        }
    }
}
