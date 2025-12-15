export interface ProductVariantAttributeSelectionDto {
  attributeName: string;
  value: string;
}

export interface CreateProductVariantDto {
  sku: string | null;
  price: number;
  stockQuantity: number;
  attributeSelections: ProductVariantAttributeSelectionDto[];
  media: [];
}
