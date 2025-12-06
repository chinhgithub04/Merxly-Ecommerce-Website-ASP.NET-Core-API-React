using FluentValidation;
using merxly.Application.DTOs.ProductAttribute;
using merxly.Application.Validators.ProductVariant;

namespace merxly.Application.Validators.ProductAttribute
{
    public class AddAttributeWithVariantsDtoValidator : AbstractValidator<AddAttributeWithVariantsDto>
    {
        public AddAttributeWithVariantsDtoValidator()
        {
            RuleFor(x => x.ProductAttributes)
                .NotEmpty().WithMessage("At least one product attribute is required.")
                .Must(attributes => attributes.Count <= 3)
                .WithMessage("A product can have a maximum of 3 attributes.");

            RuleForEach(x => x.ProductAttributes)
                .SetValidator(new CreateProductAttributeDtoValidator());

            RuleFor(x => x.ProductAttributeValues)
                .NotEmpty().WithMessage("At least one product variant is required.");

            RuleForEach(x => x.ProductAttributeValues)
                .SetValidator(new CreateProductVariantDtoValidator());

            // Validate that attribute names are unique
            RuleFor(x => x.ProductAttributes)
                .Must(attributes => attributes.Select(a => a.Name.Trim().ToLower()).Distinct().Count() == attributes.Count)
                .WithMessage("Attribute names must be unique.")
                .When(x => x.ProductAttributes.Any());
        }
    }
}
