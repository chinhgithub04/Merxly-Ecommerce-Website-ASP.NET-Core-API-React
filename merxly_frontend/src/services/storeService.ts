import type { Response } from '../types/api/common';
import type {
  CreateStoreDto,
  DetailStoreDto,
  UpdateStoreDto,
} from '../types/models/store';
import apiClient from './apiClient';

export const createStore = async (
  dto: CreateStoreDto
): Promise<Response<DetailStoreDto>> => {
  const response = await apiClient.post<Response<DetailStoreDto>>(
    '/stores',
    dto
  );
  return response.data;
};

export const getMyStore = async (): Promise<Response<DetailStoreDto>> => {
  const response = await apiClient.get<Response<DetailStoreDto>>(
    '/stores/my-store'
  );
  return response.data;
};

export const updateMyStore = async (
  dto: UpdateStoreDto
): Promise<Response<DetailStoreDto>> => {
  const response = await apiClient.patch<Response<DetailStoreDto>>(
    '/stores/my-store',
    dto
  );
  return response.data;
};
