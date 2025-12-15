export interface CategoryDto {
  id: string;
  name: string;
  parentCategoryId: string | null;
  children: CategoryDto[];
}

export interface CategoryForStore {
  id: string;
  name: string;
  productCount: number;
}
