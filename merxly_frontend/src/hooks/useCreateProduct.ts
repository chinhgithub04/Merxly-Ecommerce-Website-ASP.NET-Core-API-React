import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { CreateProductDto } from '../types/models/product';
import type { CreateProductAttributeDto } from '../types/models/productAttribute';
import type {
  CreateProductVariantDto,
  ProductVariantAttributeSelectionDto,
} from '../types/models/productVariant';
import { createProduct } from '../services/productService';

export interface ProductAttribute {
  id: string;
  name: string;
  displayOrder: number;
  values: ProductAttributeValue[];
}

export interface ProductAttributeValue {
  id: string;
  value: string;
  displayOrder: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stockQuantity: number;
  attributeSelections: ProductVariantAttributeSelectionDto[];
}

export const useCreateProduct = () => {
  const navigate = useNavigate();

  // Basic product information
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [isStoreFeatured, setIsStoreFeatured] = useState(false);

  // Attributes and variants
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  // Variant table grouping
  const [groupBy, setGroupBy] = useState<string | null>(null);

  // Generate a unique ID
  const generateId = () => Math.random().toString(36).substring(2, 15);

  // Add a new attribute
  const addAttribute = () => {
    if (attributes.length >= 3) {
      alert('Maximum 3 attributes allowed');
      return;
    }
    const newAttribute: ProductAttribute = {
      id: generateId(),
      name: '',
      displayOrder: attributes.length,
      values: [],
    };
    setAttributes([...attributes, newAttribute]);
  };

  // Update attribute name
  const updateAttributeName = (id: string, name: string) => {
    setAttributes(
      attributes.map((attr) => (attr.id === id ? { ...attr, name } : attr))
    );
  };

  // Delete attribute
  const deleteAttribute = (id: string) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
    // Regenerate variants
    const remainingAttributes = attributes.filter((attr) => attr.id !== id);
    regenerateVariants(remainingAttributes);
  };

  // Add value to attribute
  const addAttributeValue = (attributeId: string) => {
    setAttributes(
      attributes.map((attr) => {
        if (attr.id === attributeId) {
          const newValue: ProductAttributeValue = {
            id: generateId(),
            value: '',
            displayOrder: attr.values.length,
          };
          return { ...attr, values: [...attr.values, newValue] };
        }
        return attr;
      })
    );
  };

  // Update attribute value
  const updateAttributeValue = (
    attributeId: string,
    valueId: string,
    value: string
  ) => {
    setAttributes(
      attributes.map((attr) => {
        if (attr.id === attributeId) {
          return {
            ...attr,
            values: attr.values.map((val) =>
              val.id === valueId ? { ...val, value } : val
            ),
          };
        }
        return attr;
      })
    );
  };

  // Delete attribute value
  const deleteAttributeValue = (attributeId: string, valueId: string) => {
    setAttributes(
      attributes.map((attr) => {
        if (attr.id === attributeId) {
          return {
            ...attr,
            values: attr.values.filter((val) => val.id !== valueId),
          };
        }
        return attr;
      })
    );
  };

  // Generate variants from attributes (Cartesian product)
  const regenerateVariants = (attrs: ProductAttribute[] = attributes) => {
    const validAttributes = attrs.filter(
      (attr) => attr.name.trim() && attr.values.some((v) => v.value.trim())
    );

    if (validAttributes.length === 0) {
      setVariants([]);
      return;
    }

    const validValuesPerAttribute = validAttributes.map((attr) =>
      attr.values.filter((v) => v.value.trim())
    );

    // Generate all combinations (Cartesian product)
    const generateCombinations = (
      arrays: ProductAttributeValue[][]
    ): ProductAttributeValue[][] => {
      if (arrays.length === 0) return [[]];
      const [first, ...rest] = arrays;
      const combinations = generateCombinations(rest);
      return first.flatMap((value) =>
        combinations.map((combo) => [value, ...combo])
      );
    };

    const combinations = generateCombinations(validValuesPerAttribute);

    const newVariants: ProductVariant[] = combinations.map((combo) => {
      const attributeSelections: ProductVariantAttributeSelectionDto[] =
        combo.map((value, index) => ({
          attributeName: validAttributes[index].name,
          value: value.value,
        }));

      // Try to find existing variant with same selections to preserve data
      const existingVariant = variants.find((v) =>
        v.attributeSelections.every((sel) =>
          attributeSelections.find(
            (newSel) =>
              newSel.attributeName === sel.attributeName &&
              newSel.value === sel.value
          )
        )
      );

      return {
        id: existingVariant?.id || generateId(),
        sku: existingVariant?.sku || '',
        price: existingVariant?.price || 0,
        stockQuantity: existingVariant?.stockQuantity || 0,
        attributeSelections,
      };
    });

    setVariants(newVariants);
  };

  // Update variant field
  const updateVariant = (
    id: string,
    field: 'sku' | 'price' | 'stockQuantity',
    value: string | number
  ) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  // Build DTO for submission
  const buildCreateProductDto = (): CreateProductDto => {
    const productAttributesDto: CreateProductAttributeDto[] = attributes
      .filter((attr) => attr.name.trim() && attr.values.length > 0)
      .map((attr) => ({
        name: attr.name,
        displayOrder: attr.displayOrder,
        productAttributeValues: attr.values
          .filter((v) => v.value.trim())
          .map((v) => ({
            value: v.value,
            displayOrder: v.displayOrder,
          })),
      }));

    const variantsDto: CreateProductVariantDto[] = variants.map((variant) => ({
      sku: variant.sku || null,
      price: variant.price,
      stockQuantity: variant.stockQuantity,
      attributeSelections: variant.attributeSelections,
      media: [],
    }));

    return {
      name: productName,
      description: description || null,
      isStoreFeatured,
      isActive,
      categoryId: categoryId || '',
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
  });

  const handleSubmit = () => {
    if (!productName.trim()) {
      alert('Product name is required');
      return;
    }
    if (!categoryId) {
      alert('Please select a category');
      return;
    }
    if (variants.length === 0) {
      alert('Please add at least one variant');
      return;
    }

    const dto = buildCreateProductDto();
    createMutation.mutate(dto);
  };

  const handleDiscard = () => {
    navigate('/store/products');
  };

  // Grouped variants for display
  const groupedVariants = useMemo(() => {
    if (!groupBy || attributes.length < 2) return null;

    const groupAttribute = attributes.find((a) => a.name === groupBy);
    if (!groupAttribute) return null;

    const groups: Record<string, ProductVariant[]> = {};
    variants.forEach((variant) => {
      const groupSelection = variant.attributeSelections.find(
        (sel) => sel.attributeName === groupBy
      );
      if (groupSelection) {
        if (!groups[groupSelection.value]) {
          groups[groupSelection.value] = [];
        }
        groups[groupSelection.value].push(variant);
      }
    });

    return groups;
  }, [groupBy, variants, attributes]);

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
    groupedVariants,

    // Setters
    setProductName,
    setDescription,
    setCategoryId,
    setIsActive,
    setIsStoreFeatured,
    setGroupBy,

    // Attribute actions
    addAttribute,
    updateAttributeName,
    deleteAttribute,
    addAttributeValue,
    updateAttributeValue,
    deleteAttributeValue,
    regenerateVariants,

    // Variant actions
    updateVariant,

    // Form actions
    handleSubmit,
    handleDiscard,

    // Mutation state
    isSubmitting: createMutation.isPending,
  };
};
