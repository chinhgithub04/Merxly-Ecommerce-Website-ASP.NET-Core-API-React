import type {
  CreateProductVariantDto,
  ResponseUpdateVariantItemDto,
} from './productVariant';

export interface CreateProductAttributeValueDto {
  value: string;
  displayOrder: number;
}

export interface ProductAttributeValueDto {
  id: string;
  value: string;
  displayOrder: number;
}

// Add attribute values DTOs
export interface AttributeValueAdditionDto {
  productAttributeId: string;
  attributeValues: CreateProductAttributeValueDto[];
}

export interface AddAttributeValuesAndVariants {
  attributeValueAdditions: AttributeValueAdditionDto[];
  productVariants: CreateProductVariantDto[];
}

// Update attribute values DTOs
export interface BulkUpdateAttributeValueItemDto {
  id: string;
  value?: string;
  displayOrder?: number;
}

export interface BulkUpdateProductAttributeValuesDto {
  attributeValues: BulkUpdateAttributeValueItemDto[];
}

// Response DTOs
export interface ResponseUpdateAttributeValueItemDto {
  id: string;
  value: string;
  displayOrder: number;
  productAttributeId: string;
}

export interface AddAttributeValuesWithVariantsResponseDto {
  productId: string;
  addedAttributeValues: ResponseUpdateAttributeValueItemDto[];
  regeneratedVariants: ResponseUpdateVariantItemDto[];
  newMinPrice: number;
  newMaxPrice: number;
  newTotalStock: number;
}

export interface BulkUpdateProductAttributeValuesResponseDto {
  updatedAttributeValues: ResponseUpdateAttributeValueItemDto[];
}
