import type { Response, PagedResponse } from '../types/api/common';
import type { CategoryForStore } from '../types/models/category';
import type {
  ProductForStore,
  ProductQueryParameters,
  CreateProductDto,
  StoreDetailProductDto,
} from '../types/models/product';
import apiClient from './apiClient';

export const getStoreProducts = async (
  params: ProductQueryParameters
): Promise<Response<PagedResponse<ProductForStore>>> => {
  const response = await apiClient.get<
    Response<PagedResponse<ProductForStore>>
  >('/StoreProducts', { params });
  return response.data;
};

export const getUsedCategories = async (): Promise<
  Response<CategoryForStore[]>
> => {
  const response = await apiClient.get<Response<CategoryForStore[]>>(
    '/StoreProducts/used-categories'
  );
  return response.data;
};

export const createProduct = async (
  product: CreateProductDto
): Promise<Response<StoreDetailProductDto>> => {
  const response = await apiClient.post<Response<StoreDetailProductDto>>(
    '/StoreProducts',
    product
  );
  return response.data;
};
