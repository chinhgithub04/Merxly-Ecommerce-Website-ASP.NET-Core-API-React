import type { StoreProductSortBy, StoreProductSortOrder } from '../enums';

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

export interface CategoryForStore {
  id: string;
  name: string;
  productCount: number;
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
