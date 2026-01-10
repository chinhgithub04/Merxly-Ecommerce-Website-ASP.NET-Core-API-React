import type { Response } from '../types/api/common';
import type { AddToWishlistDto, WishlistDto } from '../types/models/wishlist';
import apiClient from './apiClient';

export const getWishlist = async (): Promise<Response<WishlistDto>> => {
  const response = await apiClient.get<Response<WishlistDto>>('/wishlist');
  return response.data;
};

export const addToWishlist = async (
  dto: AddToWishlistDto
): Promise<Response<WishlistDto>> => {
  const response = await apiClient.post<Response<WishlistDto>>(
    '/wishlist/items',
    dto
  );
  return response.data;
};

export const removeWishlistItem = async (
  wishlistItemId: string
): Promise<Response<void>> => {
  const response = await apiClient.delete<Response<void>>(
    `/wishlist/items/${wishlistItemId}`
  );
  return response.data;
};

export const clearWishlist = async (): Promise<Response<void>> => {
  const response = await apiClient.delete<Response<void>>('/wishlist');
  return response.data;
};
