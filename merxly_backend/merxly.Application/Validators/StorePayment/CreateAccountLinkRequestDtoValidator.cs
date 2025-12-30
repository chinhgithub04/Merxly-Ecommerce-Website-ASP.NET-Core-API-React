using FluentValidation;
using merxly.Application.DTOs.StorePayment;

namespace merxly.Application.Validators.StorePayment
{
    public class CreateAccountLinkRequestDtoValidator : AbstractValidator<CreateAccountLinkRequestDto>
    {
        public CreateAccountLinkRequestDtoValidator()
        {
            RuleFor(x => x.ReturnUrl)
                .NotEmpty().WithMessage("Return URL is required")
                .Must(BeAValidUrl).WithMessage("Return URL must be a valid URL");

            RuleFor(x => x.RefreshUrl)
                .NotEmpty().WithMessage("Refresh URL is required")
                .Must(BeAValidUrl).WithMessage("Refresh URL must be a valid URL");

            RuleFor(x => x.Type)
                .NotEmpty().WithMessage("Link type is required")
                .Must(x => x == "account_onboarding" || x == "account_update")
                .WithMessage("Link type must be either 'account_onboarding' or 'account_update'");
        }

        private bool BeAValidUrl(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }
    }
}
