import type { StoreProductSortBy, StoreProductSortOrder } from '../enums';
import type { CreateProductAttributeDto } from './productAttribute';
import type { CreateProductVariantDto } from './productVariant';

export interface ProductForStore {
  id: string;
  name: string;
  isStoreFeatured: boolean;
  isActive: boolean;
  totalStock: number;
  totalVariants: number;
  mainMediaUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
  categoryId: string;
  categoryName: string;
}

export interface ProductQueryParameters {
  pageNumber?: number;
  pageSize?: number;
  isStoreFeatured?: boolean;
  isActive?: boolean;
  categoryId?: string;
  searchTerm?: string;
  sortBy?: StoreProductSortBy;
  sortOrder?: StoreProductSortOrder;
}

export interface CreateProductDto {
  name: string;
  description: string | null;
  isStoreFeatured: boolean;
  isActive: boolean;
  categoryId: string;
  productAttributes: CreateProductAttributeDto[];
  variants: CreateProductVariantDto[];
}
