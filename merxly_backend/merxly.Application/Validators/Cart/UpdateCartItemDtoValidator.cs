using FluentValidation;
using merxly.Application.DTOs.Cart;

namespace merxly.Application.Validators.Cart
{
    public class UpdateCartItemDtoValidator : AbstractValidator<UpdateCartItemDto>
    {
        public UpdateCartItemDtoValidator()
        {
            RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Quantity must be greater than 0")
                .LessThanOrEqualTo(999)
                .WithMessage("Quantity cannot exceed 999");
        }
    }
}
