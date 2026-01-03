export interface DetailStoreDto {
  id: string;
  storeName: string;
  description: string | null;
  logoImagePublicId: string | null;
  bannerImagePublicId: string | null;
  email: string;
  phoneNumber: string;
  website: string | null;
  isActive: boolean;
  isVerified: boolean;
  commissionRate: number;
  createdAt: string;
  ownerId: string;
  ownerName: string;
}

export interface UpdateStoreDto {
  storeName?: string;
  description?: string;
  logoImagePublicId?: string;
  bannerImagePublicId?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  isActive?: boolean;
}
