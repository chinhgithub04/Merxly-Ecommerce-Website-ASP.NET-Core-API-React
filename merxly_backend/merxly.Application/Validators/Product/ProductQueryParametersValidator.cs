using FluentValidation;
using merxly.Application.DTOs.Product;
using merxly.Application.Validators.Common;

namespace merxly.Application.Validators.Product
{
    public class ProductQueryParametersValidator : AbstractValidator<ProductQueryParameters>
    {
        public ProductQueryParametersValidator()
        {
            Include(new PaginationQueryValidator());

            RuleFor(x => x.SearchTerm)
                .MaximumLength(100).WithMessage("Search term cannot exceed 100 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.SearchTerm));
            
            RuleFor(x => x.MinPrice)
                .GreaterThanOrEqualTo(0).WithMessage("Minimum price must be greater than or equal to 0.")
                .When(x => x.MinPrice.HasValue);

            RuleFor(x => x.MaxPrice)
                .GreaterThanOrEqualTo(x => x.MinPrice).WithMessage("Maximum price must be greater than or equal to minimum price.")
                .When(x => x.MinPrice.HasValue && x.MaxPrice.HasValue);

            RuleFor(x => x.MinRating)
                .GreaterThanOrEqualTo(0).WithMessage("Minimum rating must be greater than or equal to 0.")
                .LessThanOrEqualTo(5).WithMessage("Minimum rating must be less than or equal to 5.")
                .When(x => x.MinRating.HasValue);

            RuleFor(x => x.SortBy)
                .IsInEnum().WithMessage("Invalid sort by value.");
        }
    }
}