import type { Response } from '../types/api/common';
import type {
  AddToCartDto,
  CartDto,
  UpdateCartItemDto,
} from '../types/models/cart';
import apiClient from './apiClient';

export const getCart = async (): Promise<Response<CartDto>> => {
  const response = await apiClient.get<Response<CartDto>>('/cart');
  return response.data;
};

export const addToCart = async (
  dto: AddToCartDto
): Promise<Response<CartDto>> => {
  const response = await apiClient.post<Response<CartDto>>('/cart/items', dto);
  return response.data;
};

export const updateCartItem = async (
  cartItemId: string,
  dto: UpdateCartItemDto
): Promise<Response<CartDto>> => {
  const response = await apiClient.patch<Response<CartDto>>(
    `/cart/items/${cartItemId}`,
    dto
  );
  return response.data;
};

export const removeCartItem = async (
  cartItemId: string
): Promise<Response<void>> => {
  const response = await apiClient.delete<Response<void>>(
    `/cart/items/${cartItemId}`
  );
  return response.data;
};

export const clearCart = async (): Promise<Response<void>> => {
  const response = await apiClient.delete<Response<void>>('/cart');
  return response.data;
};
