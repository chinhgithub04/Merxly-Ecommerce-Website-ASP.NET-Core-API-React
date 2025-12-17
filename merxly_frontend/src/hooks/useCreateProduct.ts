import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productService';
import type { CreateProductDto } from '../types/models/product';
import type { CreateProductAttributeDto } from '../types/models/productAttribute';
import type { CreateProductVariantDto } from '../types/models/productVariant';
import type { CreateProductVariantMediaDto } from '../types/models/productVariantMedia';

// Internal types for UI state (matches ProductVariantsSection)
interface AttributeValue {
  id: string;
  value: string;
}

interface Attribute {
  id: string;
  name: string;
  values: AttributeValue[];
}

interface Variant {
  id: string;
  attributeValues: Record<string, string>; // attributeId -> valueId
  price: number;
  available: number;
  sku: string;
  media?: CreateProductVariantMediaDto[];
}

export const useCreateProduct = () => {
  const navigate = useNavigate();

  // Basic product information
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [isStoreFeatured, setIsStoreFeatured] = useState(false);

  // Attributes and variants (managed by ProductVariantsSection)
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [groupBy, setGroupBy] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{
    productName?: string;
    categoryId?: string;
    variants?: string;
  }>({});

  // Build DTO for submission
  const buildCreateProductDto = (): CreateProductDto | null => {
    // Reset errors
    const newErrors: typeof errors = {};

    // Validate product name
    if (!productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    // Validate category
    if (!categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    // Validate variants
    if (variants.length === 0) {
      newErrors.variants = 'Please add at least one variant';
    } else {
      // Validate each variant
      const invalidVariant = variants.find(
        (v) =>
          v.price < 0 ||
          v.available < 0 ||
          Object.keys(v.attributeValues).length === 0
      );

      if (invalidVariant) {
        newErrors.variants =
          'All variants must have valid price, stock quantity, and attribute selections';
      }
    }

    // If there are errors, set them and return null
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return null;
    }

    // Clear errors
    setErrors({});

    // Build product attributes DTO
    const productAttributesDto: CreateProductAttributeDto[] = attributes
      .filter(
        (attr) => attr.name.trim() && attr.values.some((v) => v.value.trim())
      )
      .map((attr, attrIndex) => ({
        name: attr.name.trim(),
        displayOrder: attrIndex,
        productAttributeValues: attr.values
          .filter((v) => v.value.trim())
          .map((v, valueIndex) => ({
            value: v.value.trim(),
            displayOrder: valueIndex,
          })),
      }));

    // Build variants DTO
    const variantsDto: CreateProductVariantDto[] = variants.map((variant) => {
      // Build attribute selections
      const attributeSelections = Object.entries(variant.attributeValues).map(
        ([attrId, valueId]) => {
          const attr = attributes.find((a) => a.id === attrId);
          const value = attr?.values.find((v) => v.id === valueId);

          return {
            attributeName: attr?.name || '',
            value: value?.value || '',
          };
        }
      );

      return {
        sku: variant.sku || null,
        price: variant.price,
        stockQuantity: variant.available,
        attributeSelections,
        media: variant.media || [],
      };
    });

    return {
      name: productName.trim(),
      description: description.trim() || null,
      isStoreFeatured,
      isActive,
      categoryId: categoryId!,
      productAttributes: productAttributesDto,
      variants: variantsDto,
    };
  };

  // Mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      navigate('/store/products');
    },
    onError: (error: any) => {
      console.error('Failed to create product:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to create product';
      setErrors({ variants: errorMessage });
    },
  });

  const handleSubmit = () => {
    const dto = buildCreateProductDto();

    if (dto) {
      createMutation.mutate(dto);
    }
  };

  const handleDiscard = () => {
    navigate('/store/products');
  };

  return {
    // State
    productName,
    description,
    categoryId,
    isActive,
    isStoreFeatured,
    attributes,
    variants,
    groupBy,
    errors,

    // Setters
    setProductName,
    setDescription,
    setCategoryId,
    setIsActive,
    setIsStoreFeatured,
    setAttributes,
    setVariants,
    setGroupBy,

    // Actions
    handleSubmit,
    handleDiscard,

    // Status
    isSubmitting: createMutation.isPending,
  };
};
