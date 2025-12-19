import type {
  CreateProductAttributeValueDto,
  ProductAttributeValueDto,
  ResponseUpdateAttributeValueItemDto,
} from './productAttributeValue';
import type {
  CreateProductVariantDto,
  ResponseUpdateVariantItemDto,
} from './productVariant';

export interface CreateProductAttributeDto {
  name: string;
  displayOrder: number;
  productAttributeValues: CreateProductAttributeValueDto[];
}

export interface ProductAttributeDto {
  id: string;
  name: string;
  displayOrder: number;
  productAttributeValues: ProductAttributeValueDto[];
}

export interface ResponseUpdateAttributeItemDto {
  id: string;
  name: string;
  displayOrder: number;
}

// Add attributes DTOs
export interface AddAttributeWithVariantsDto {
  productAttributes: CreateProductAttributeDto[];
  productAttributeValues: CreateProductVariantDto[];
}

export interface AddAttributesWithVariantsResponseDto {
  productId: string;
  addedAttributes: ResponseUpdateAttributeItemDto[];
  addedAttributeValues: ResponseUpdateAttributeValueItemDto[];
  regeneratedVariants: ResponseUpdateVariantItemDto[];
}

// Update attributes DTOs
export interface BulkUpdateAttributeItemDto {
  id: string;
  name?: string;
  displayOrder?: number;
}

export interface BulkUpdateProductAttributesDto {
  attributes: BulkUpdateAttributeItemDto[];
}

export interface BulkUpdateProductAttributesResponseDto {
  updatedAttributes: ResponseUpdateAttributeItemDto[];
}

// Delete attributes DTOs
export interface DeleteAttributesWithVariantsDto {
  attributeIds: string[];
  productVariants: CreateProductVariantDto[];
}

export interface BulkDeleteAttributesResponseDto {
  deletedAttributeIds: string[];
  deletedAttributeValueIds: string[];
  regeneratedVariants: ResponseUpdateVariantItemDto[];
}
