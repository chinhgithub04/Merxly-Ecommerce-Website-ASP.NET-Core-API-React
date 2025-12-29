using FluentValidation;
using merxly.Application.DTOs.Checkout;

namespace merxly.Application.Validators.Checkout
{
    public class CheckoutItemDtoValidator : AbstractValidator<CheckoutItemDto>
    {
        public CheckoutItemDtoValidator()
        {
            RuleFor(x => x.ProductVariantId)
                .NotEmpty()
                .WithMessage("Product variant ID is required");

            RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Quantity must be greater than 0");
        }
    }
}
