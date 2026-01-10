import type { Response, PagedResponse } from '../types/api/common';
import type {
  CategoryDto,
  ParentCategoryDto,
  AdminCategoryDto,
  DetailCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../types/models/category';
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

export const getAdminCategoryTree = async (
  pageNumber = 1,
  pageSize = 100
): Promise<Response<PagedResponse<AdminCategoryDto>>> => {
  const response = await apiClient.get<
    Response<PagedResponse<AdminCategoryDto>>
  >('/Categories/admin/tree', {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

export const getParentCategories = async (
  pageNumber = 1,
  pageSize = 100
): Promise<Response<PagedResponse<ParentCategoryDto>>> => {
  const response = await apiClient.get<
    Response<PagedResponse<ParentCategoryDto>>
  >('/Categories/parents', {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

export const getCategoryById = async (
  id: string
): Promise<Response<DetailCategoryDto>> => {
  const response = await apiClient.get<Response<DetailCategoryDto>>(
    `/Categories/${id}`
  );
  return response.data;
};

export const createCategory = async (
  data: CreateCategoryDto
): Promise<Response<DetailCategoryDto>> => {
  const response = await apiClient.post<Response<DetailCategoryDto>>(
    '/Categories',
    data
  );
  return response.data;
};

export const updateCategory = async (
  id: string,
  data: UpdateCategoryDto
): Promise<Response<DetailCategoryDto>> => {
  const response = await apiClient.patch<Response<DetailCategoryDto>>(
    `/Categories/${id}`,
    data
  );
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/Categories/${id}`);
};
