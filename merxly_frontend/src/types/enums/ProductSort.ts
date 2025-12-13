export const StoreProductSortBy = {
  ProductName: 'ProductName',
  CreatedAt: 'CreatedAt',
  UpdatedAt: 'UpdatedAt',
  TotalStock: 'TotalStock',
} as const;

export type StoreProductSortBy = (typeof StoreProductSortBy)[keyof typeof StoreProductSortBy];

export const StoreProductSortOrder = {
  Ascending: 'Ascending',
  Descending: 'Descending',
} as const;

export type StoreProductSortOrder = (typeof StoreProductSortOrder)[keyof typeof StoreProductSortOrder];
