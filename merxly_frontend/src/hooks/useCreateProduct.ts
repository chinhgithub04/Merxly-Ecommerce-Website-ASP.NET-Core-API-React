import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById } from '../services/productService';
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
  const { id: productId } = useParams<{ id: string }>();
  const isEditMode = !!productId;

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

  // Load product data if in edit mode
  const { data: productData, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId!),
    enabled: isEditMode,
  });

  // Map loaded product data to UI state
  useEffect(() => {
    if (productData?.data && isEditMode) {
      const product = productData.data;

      // Set basic info
      setProductName(product.name);
      setDescription(product.description || '');
      setCategoryId(product.categoryId);
      setIsActive(product.isActive);
      setIsStoreFeatured(product.isStoreFeatured);

      // Map attributes
      const mappedAttributes: Attribute[] = product.productAttributes
        .filter((attr) => attr != null)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((attr) => ({
          id: attr.id,
          name: attr.name,
          values: (attr.productAttributeValues || [])
            .filter((val) => val != null)
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((val) => ({
              id: val.id,
              value: val.value,
            })),
        }));

      setAttributes(mappedAttributes);

      // Map variants
      const mappedVariants: Variant[] = product.variants
        .filter((variant) => variant != null)
        .map((variant) => {
          // Build attributeValues mapping from productAttributeValues
          const attributeValues: Record<string, string> = {};
          (variant.productAttributeValues || [])
            .filter((val) => val != null && val.id)
            .forEach((val) => {
              // Find which attribute this value belongs to
              const attr = mappedAttributes.find((a) =>
                a.values.some((v) => v.id === val.id)
              );
              if (attr) {
                attributeValues[attr.id] = val.id;
              }
            });

          // Map media
          const media: CreateProductVariantMediaDto[] = (
            variant.productVariantMedia || []
          )
            .filter((m) => m != null && m.mediaPublicId)
            .map((m) => ({
              mediaPublicId: m.mediaPublicId,
              fileName: '',
              fileExtension: '',
              fileSizeInBytes: 0,
              displayOrder: m.displayOrder,
              isMain: m.isMain,
              mediaType: m.mediaType,
            }));

          return {
            id: variant.id,
            attributeValues,
            price: variant.price,
            available: variant.stockQuantity,
            sku: variant.sku || '',
            media,
          };
        });

      setVariants(mappedVariants);

      // Set default groupBy if needed
      if (mappedAttributes.length >= 2) {
        setGroupBy(mappedAttributes[0].id);
      }
    }
  }, [productData, isEditMode]);

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
    isLoading: isLoadingProduct,
    isEditMode,
  };
};
