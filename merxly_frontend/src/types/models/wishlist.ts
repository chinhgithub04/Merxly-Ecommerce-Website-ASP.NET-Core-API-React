export interface AddToWishlistDto {
  productId: string;
  productVariantId?: string;
}

export interface WishlistItemDto {
  id: string;
  productId: string;
  productName: string;
  productImagePublicId: string | null;
  price: number;
  isAvailable: boolean;
  productVariantId: string | null;
  selectedAttributes: Record<string, string>;
  createdAt: string;
}

export interface WishlistDto {
  id: string;
  wishlistItems: WishlistItemDto[];
  totalItems: number;
  createdAt: string;
  updatedAt: string | null;
}
