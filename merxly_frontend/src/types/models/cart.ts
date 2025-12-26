export interface AddToCartDto {
  productVariantId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CartItemDto {
  id: string;
  productVariantId: string;
  productName: string;
  productImagePublicId: string | null;
  priceAtAdd: number;
  quantity: number;
  stockQuantity: number;
  isAvailable: boolean;
  selectedAttributes: Record<string, string>;
  createdAt: string;
}

export interface CartDto {
  id: string;
  cartItems: CartItemDto[];
  totalItems: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string | null;
}
