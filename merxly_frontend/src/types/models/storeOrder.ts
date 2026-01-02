import type { PaginationQuery } from '../api/common';
import type { OrderStatus } from '../enums/Status';

export interface StoreSubOrderDto {
  id: string;
  subOrderNumber: string;
  customerFullName: string;
  customerEmail: string;
  status: OrderStatus;
  totalItems: number;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface StoreSubOrderFilterDto extends PaginationQuery {
  status?: OrderStatus;
  searchTerm?: string;
  fromDate?: string;
  toDate?: string;
}

export interface StoreSubOrderDetailDto {
  id: string;
  subOrderNumber: string;
  status: OrderStatus;
  subTotal: number;
  tax?: number;
  shippingCost?: number;
  totalAmount: number;
  carrier?: string;
  trackingNumber?: string;
  notes?: string;
  customerFullName: string;
  customerEmail: string;
  customerFullAddress: string;
  customerPostalCode: string;
  customerPhoneNumber?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  orderItems: StoreOrderItemDto[];
  statusHistory: OrderStatusHistoryDto[];
}

export interface StoreOrderItemDto {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productVariantId?: string;
  productVariantName: string;
  productVariantSKU?: string;
  productVariantMainPublicId?: string;
  selectedAttributes: Record<string, string>;
}

export interface OrderStatusHistoryDto {
  id: string;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  changedBy?: string;
}

export interface UpdateSubOrderStatusDto {
  status: OrderStatus;
  notes?: string;
}
