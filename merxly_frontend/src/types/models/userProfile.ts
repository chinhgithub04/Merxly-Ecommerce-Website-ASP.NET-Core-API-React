export interface UserProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  avatarPublicId?: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
}

export interface UpdateUserProfileDto {
  firstName?: string;
  lastName?: string;
  avatarPublicId?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
