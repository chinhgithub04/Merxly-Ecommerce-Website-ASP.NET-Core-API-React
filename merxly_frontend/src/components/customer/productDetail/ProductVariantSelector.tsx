import { useState, useMemo } from 'react';
import type { ProductAttributeDto } from '../../../types/models/productAttribute';
import type { ProductVariantForCustomerDto } from '../../../types/models/productVariant';

interface ProductVariantSelectorProps {
  productAttributes: ProductAttributeDto[];
  variants: ProductVariantForCustomerDto[];
  onVariantChange: (variant: ProductVariantForCustomerDto) => void;
}

export const ProductVariantSelector = ({
  productAttributes,
  variants,
  onVariantChange,
}: ProductVariantSelectorProps) => {
  // Track selected attribute value IDs for each attribute
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    () => {
      // Initialize with the first variant's attribute values
      const firstVariant = variants.find((v) => v.isActive);
      if (!firstVariant) return {};

      const initial: Record<string, string> = {};
      firstVariant.productAttributeValues?.forEach((variantAttrValue) => {
        const attribute = productAttributes.find((attr) =>
          attr.productAttributeValues?.some(
            (val) => val.id === variantAttrValue.productAttributeValueId
          )
        );
        if (attribute) {
          initial[attribute.id] = variantAttrValue.productAttributeValueId;
        }
      });
      return initial;
    }
  );

  // Get currently selected variant based on selected attribute values
  const selectedVariant = useMemo(() => {
    const selectedValueIds = Object.values(selectedValues);
    return variants.find((variant) => {
      if (!variant.isActive) return false;
      const variantValueIds = variant.productAttributeValues.map(
        (v) => v.productAttributeValueId
      );
      return (
        selectedValueIds.length === variantValueIds.length &&
        selectedValueIds.every((id) => variantValueIds.includes(id))
      );
    });
  }, [selectedValues, variants]);

  // Update parent when selected variant changes
  useMemo(() => {
    if (selectedVariant) {
      onVariantChange(selectedVariant);
    }
  }, [selectedVariant, onVariantChange]);

  // Check if an attribute value can be selected
  const isValueAvailable = (attributeId: string, valueId: string): boolean => {
    // Create a temporary selection with this value
    const tempSelection = { ...selectedValues, [attributeId]: valueId };
    const tempSelectedIds = Object.values(tempSelection);

    // Check if any variant matches this combination
    return variants.some((variant) => {
      if (!variant.isActive) return false;
      const variantValueIds = variant.productAttributeValues.map(
        (v) => v.productAttributeValueId
      );
      return tempSelectedIds.every((id) => variantValueIds.includes(id));
    });
  };

  const handleValueSelect = (attributeId: string, valueId: string) => {
    setSelectedValues((prev) => ({ ...prev, [attributeId]: valueId }));
  };

  // Sort attributes by display order
  const sortedAttributes = [...productAttributes].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <div className='space-y-6'>
      {sortedAttributes.map((attribute) => {
        // Sort attribute values by display order
        const sortedValues = [...(attribute.productAttributeValues || [])].sort(
          (a, b) => a.displayOrder - b.displayOrder
        );

        return (
          <div key={attribute.id}>
            <h4 className='text-sm font-semibold text-neutral-900 mb-3'>
              {attribute.name}
            </h4>
            <div className='flex flex-wrap gap-2'>
              {sortedValues.map((value) => {
                const isSelected = selectedValues[attribute.id] === value.id;
                const isAvailable = isValueAvailable(attribute.id, value.id);

                return (
                  <button
                    key={value.id}
                    onClick={() =>
                      isAvailable && handleValueSelect(attribute.id, value.id)
                    }
                    disabled={!isAvailable}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : isAvailable
                        ? 'border-neutral-300 text-neutral-700 hover:border-neutral-400'
                        : 'border-neutral-200 text-neutral-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {value.value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
