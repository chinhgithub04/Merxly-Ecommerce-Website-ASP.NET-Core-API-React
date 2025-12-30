using FluentValidation;
using merxly.Application.DTOs.StorePayment;

namespace merxly.Application.Validators.StorePayment
{
    public class CreateConnectAccountDtoValidator : AbstractValidator<CreateConnectAccountDto>
    {
        public CreateConnectAccountDtoValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(255).WithMessage("Email cannot exceed 255 characters");

            RuleFor(x => x.Country)
                .NotEmpty().WithMessage("Country is required")
                .Length(2).WithMessage("Country must be a 2-letter ISO code")
                .Matches("^[A-Z]{2}$").WithMessage("Country must be uppercase ISO code (e.g., US, GB)");

            RuleFor(x => x.BusinessType)
                .NotEmpty().WithMessage("Business type is required")
                .Must(x => x == "individual" || x == "company")
                .WithMessage("Business type must be either 'individual' or 'company'");
        }
    }
}
