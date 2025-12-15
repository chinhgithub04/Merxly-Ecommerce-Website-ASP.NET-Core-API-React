import type { Response, PagedResponse } from '../types/api/common';
import type { CategoryDto } from '../types/models/category';
import apiClient from './apiClient';

export const getCategoryTree = async (
  pageNumber = 1,
  pageSize = 100
): Promise<Response<PagedResponse<CategoryDto>>> => {
  const response = await apiClient.get<Response<PagedResponse<CategoryDto>>>(
    '/Categories/tree',
    {
      params: { pageNumber, pageSize },
    }
  );
  return response.data;
};
