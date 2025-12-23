import type {
  StoreProductSortBy,
  StoreProductSortOrder,
  ProductSortBy,
} from '../enums';
import type {
  CreateProductAttributeDto,
  ProductAttributeDto,
} from './productAttribute';
import type {
  CreateProductVariantDto,
  ProductVariantDto,
  ProductVariantForCustomerDto,
} from './productVariant';

export interface ProductDto {
  id: string;
  name: string;
  minPrice: number | null;
  maxPrice: number | null;
  totalStock: number;
  mainMediaPublicId: string | null;
  averageRating: number;
  reviewCount: number;
  isStoreFeatured: boolean;
  isPlatformFeatured: boolean;
  totalSold: number;
  categoryName: string;
  categoryId: string;
  createdAt: string;
}

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

export interface CustomerProductQueryParameters {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  isPlatformFeatured?: boolean;
  storeId?: string;
  sortBy?: ProductSortBy;
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

export interface StoreDetailProductDto {
  id: string;
  name: string;
  description: string | null;
  isStoreFeatured: boolean;
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  totalSold: number;
  categoryId: string;
  categoryName: string;
  productAttributes: ProductAttributeDto[];
  variants: ProductVariantDto[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string | null;
  isStoreFeatured?: boolean;
  isActive?: boolean;
  categoryId?: string;
}

export interface ResponseUpdateProductDto {
  id: string;
  name: string;
  description: string | null;
  isStoreFeatured: boolean;
  isActive: boolean;
  categoryId: string;
}

export interface DetailProductDto {
  id: string;
  name: string;
  description: string | null;
  isStoreFeatured: boolean;
  isPlatformFeatured: boolean;
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  totalSold: number;
  createdAt: string;
  updatedAt: string | null;
  categoryId: string;
  categoryName: string;
  storeId: string;
  storeName: string;
  storeLogoPublicId: string;
  storeIsVerified: boolean;
  productAttributes: ProductAttributeDto[];
  variants: ProductVariantForCustomerDto[];
}
