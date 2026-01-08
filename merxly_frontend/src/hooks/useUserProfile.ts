import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from '../services/userProfileService';
import type {
  UpdateUserProfileDto,
  ChangePasswordDto,
} from '../types/models/userProfile';

/**
 * Hook to fetch user profile
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });
};

/**
 * Hook to update user profile
 */
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserProfileDto) => updateUserProfile(data),
    onSuccess: () => {
      // Invalidate user profile query to refetch
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

/**
 * Hook to change password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) => changePassword(data),
  });
};
