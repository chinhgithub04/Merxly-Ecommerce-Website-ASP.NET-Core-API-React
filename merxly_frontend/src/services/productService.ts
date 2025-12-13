import type { Response, PagedResponse } from '../types/api/common';
import type {
  ProductForStore,
  CategoryForStore,
  ProductQueryParameters,
} from '../types/api/product';
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
