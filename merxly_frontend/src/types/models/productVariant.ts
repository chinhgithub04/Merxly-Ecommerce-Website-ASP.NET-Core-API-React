import type { ProductAttributeValueDto } from './productAttributeValue';
import type {
  ProductVariantMediaDto,
  CreateProductVariantMediaDto,
} from './productVariantMedia';

export interface ProductVariantAttributeSelectionDto {
  attributeName: string;
  value: string;
}

export interface CreateProductVariantDto {
  sku: string | null;
  price: number;
  stockQuantity: number;
  attributeSelections: ProductVariantAttributeSelectionDto[];
  media: CreateProductVariantMediaDto[];
}

export interface ProductVariantDto {
  id: string;
  mainImageUrl: string | null;
  sku: string | null;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  productAttributeValues: ProductAttributeValueDto[];
  productVariantMedia: ProductVariantMediaDto[];
}
