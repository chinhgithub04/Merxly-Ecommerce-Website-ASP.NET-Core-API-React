using FluentValidation;
using merxly.Application.DTOs.ProductAttribute;
using merxly.Application.Validators.ProductAttributeValue;

namespace merxly.Application.Validators.ProductAttribute
{
    public class CreateProductAttributeDtoValidator : AbstractValidator<CreateProductAttributeDto>
    {
        public CreateProductAttributeDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Attribute name is required.")
                .MaximumLength(100).WithMessage("Attribute name cannot exceed 100 characters.");

            RuleFor(x => x.DisplayOrder)
                .GreaterThanOrEqualTo(0).WithMessage("Display order must be non-negative.");

            RuleFor(x => x.ProductAttributeValues)
                .NotEmpty().WithMessage("At least one attribute value is required.");

            RuleForEach(x => x.ProductAttributeValues)
                .SetValidator(new CreateProductAttributeValueDtoValidator());

            // Validate that attribute value names are unique within the attribute
            RuleFor(x => x.ProductAttributeValues)
                .Must(values => values.Select(v => v.Value.Trim().ToLower()).Distinct().Count() == values.Count)
                .WithMessage("Attribute value names must be unique.")
                .When(x => x.ProductAttributeValues.Any());
        }
    }
}
