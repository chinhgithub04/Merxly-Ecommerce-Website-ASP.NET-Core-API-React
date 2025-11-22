using FluentValidation;
using merxly.Application.DTOs.Auth;

namespace merxly.Application.Validators.Auth
{
    public class RefreshTokenDtoValidator : AbstractValidator<RefreshTokenDto>
    {
        public RefreshTokenDtoValidator()
        {
            RuleFor(x => x.RefreshToken)
                .NotEmpty().WithMessage("Refresh token cannot be empty.");
        }
    }
}
