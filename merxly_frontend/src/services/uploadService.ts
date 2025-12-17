import type { Response } from '../types/api/common';
import type {
  FileUploadResult,
  UploadImageResponse,
  UploadVideoResponse,
} from '../types/api/upload';
import apiClient from './apiClient';

export const uploadImage = async (
  file: File,
  folderName: string,
  imageType: number
): Promise<Response<FileUploadResult>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<UploadImageResponse>(
    `/Upload/image?imageType=${imageType}&folderName=${encodeURIComponent(
      folderName
    )}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const uploadVideo = async (
  file: File,
  folderName: string
): Promise<Response<FileUploadResult>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<UploadVideoResponse>(
    `/Upload/video?folderName=${encodeURIComponent(folderName)}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};
