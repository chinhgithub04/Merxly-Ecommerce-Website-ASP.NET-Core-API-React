import type { CreateProductAttributeValueDto } from './productAttributeValue';

export interface CreateProductAttributeDto {
  name: string;
  displayOrder: number;
  productAttributeValues: CreateProductAttributeValueDto[];
}
