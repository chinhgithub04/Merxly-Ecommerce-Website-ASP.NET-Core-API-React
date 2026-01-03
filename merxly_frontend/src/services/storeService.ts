import type { Response } from '../types/api/common';
import type { DetailStoreDto, UpdateStoreDto } from '../types/models/store';
import apiClient from './apiClient';

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
