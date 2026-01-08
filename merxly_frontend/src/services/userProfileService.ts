import apiClient from './apiClient';
import type { Response } from '../types/api/common';
import type {
  UserProfileDto,
  UpdateUserProfileDto,
  ChangePasswordDto,
} from '../types/models/userProfile';

/**
 * Get current user's profile information
 */
export const getUserProfile = async (): Promise<Response<UserProfileDto>> => {
  const response = await apiClient.get<Response<UserProfileDto>>(
    '/userprofile'
  );
  return response.data;
};

/**
 * Update current user's profile information
 */
export const updateUserProfile = async (
  data: UpdateUserProfileDto
): Promise<Response<UserProfileDto>> => {
  const response = await apiClient.put<Response<UserProfileDto>>(
    '/userprofile',
    data
  );
  return response.data;
};

/**
 * Change current user's password
 */
export const changePassword = async (
  data: ChangePasswordDto
): Promise<Response<object>> => {
  const response = await apiClient.post<Response<object>>(
    '/userprofile/change-password',
    data
  );
  return response.data;
};
