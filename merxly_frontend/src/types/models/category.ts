import type { ProductDto } from './product';

export interface CategoryDto {
  id: string;
  name: string;
  parentCategoryId: string | null;
  children: CategoryDto[];
}

export interface ParentCategoryDto {
  id: string;
  name: string;
  imagePublicId: string | null;
  isActive: boolean;
}

export interface AdminCategoryDto {
  id: string;
  name: string;
  description: string | null;
  imagePublicId: string | null;
  parentCategoryId: string | null;
  isActive: boolean;
  children: AdminCategoryDto[];
}

export interface DetailCategoryDto {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  parentCategoryId: string | null;
  isActive: boolean;
  products: ProductDto[];
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  imagePublicId?: string;
  parentCategoryId?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  imagePublicId?: string;
  parentCategoryId?: string;
  isActive?: boolean;
}

export interface CategoryForStore {
  id: string;
  name: string;
  productCount: number;
}
