using FluentValidation;
using merxly.Application.DTOs.Checkout;

namespace merxly.Application.Validators.Checkout
{
    public class CheckoutRequestDtoValidator : AbstractValidator<CheckoutRequestDto>
    {
        public CheckoutRequestDtoValidator()
        {
            RuleFor(x => x.Items)
                .NotEmpty()
                .WithMessage("At least one item is required for checkout");

            RuleForEach(x => x.Items)
                .SetValidator(new CheckoutItemDtoValidator());

            RuleFor(x => x.ShippingAddressId)
                .NotEmpty()
                .WithMessage("Shipping address is required");

            RuleFor(x => x.StoreNotes)
                .Must(notes => notes == null || notes.All(n => n.Value.Length <= 500))
                .WithMessage("Each store note cannot exceed 500 characters")
                .When(x => x.StoreNotes != null);
        }
    }
}
