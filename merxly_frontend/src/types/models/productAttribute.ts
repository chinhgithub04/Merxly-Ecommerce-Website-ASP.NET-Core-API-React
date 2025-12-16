import type {
  CreateProductAttributeValueDto,
  ProductAttributeValueDto,
} from './productAttributeValue';

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
