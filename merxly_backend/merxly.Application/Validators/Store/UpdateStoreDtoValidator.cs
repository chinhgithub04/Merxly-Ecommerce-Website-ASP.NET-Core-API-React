using FluentValidation;
using merxly.Application.DTOs.Store;

namespace merxly.Application.Validators.Store
{
    public class UpdateStoreDtoValidator : AbstractValidator<UpdateStoreDto>
    {
        public UpdateStoreDtoValidator()
        {
            RuleFor(x => x.StoreName)
                .MaximumLength(200).WithMessage("Store name cannot exceed 200 characters.")
                .When(x => !string.IsNullOrEmpty(x.StoreName));

            RuleFor(x => x.Description)
                .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters.")
                .When(x => !string.IsNullOrEmpty(x.Description));

            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("Invalid email format.")
                .MaximumLength(256).WithMessage("Email cannot exceed 256 characters.")
                .When(x => !string.IsNullOrEmpty(x.Email));

            RuleFor(x => x.PhoneNumber)
                .Matches(@"(^0[3|5|7|8|9][0-9]{8}$)|(^(1800|1900)[0-9]{4,8}$)")
                .WithMessage("Invalid phone number format.")
                .When(x => !string.IsNullOrEmpty(x.PhoneNumber));

            RuleFor(x => x.Website)
                .Must(BeAValidUrl).WithMessage("Invalid website URL.")
                .When(x => !string.IsNullOrEmpty(x.Website));
        }

        private bool BeAValidUrl(string? url)
        {
            if (string.IsNullOrEmpty(url)) return true;
            return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }
    }
}
