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

export interface CreateStoreDto {
  storeName: string;
  description?: string | null;
  logoImagePublicId?: string | null;
  bannerImagePublicId?: string | null;
  identityCardFrontPublicId: string;
  identityCardBackPublicId: string;
  bussinessLicensePublicId: string;
  taxCode: string;
  email: string;
  phoneNumber: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhoneNumber?: string | null;
  website?: string | null;
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
