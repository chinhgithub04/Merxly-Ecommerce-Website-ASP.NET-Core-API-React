export const StoreProductSortBy = {
  ProductName: 'ProductName',
  CreatedAt: 'CreatedAt',
  UpdatedAt: 'UpdatedAt',
  TotalStock: 'TotalStock',
} as const;

export type StoreProductSortBy =
  (typeof StoreProductSortBy)[keyof typeof StoreProductSortBy];

export const StoreProductSortOrder = {
  Ascending: 'Ascending',
  Descending: 'Descending',
} as const;

export type StoreProductSortOrder =
  (typeof StoreProductSortOrder)[keyof typeof StoreProductSortOrder];

export const ProductSortBy = {
  StoreFeatured: 0,
  PlatformFeatured: 1,
  PriceLowToHigh: 2,
  PriceHighToLow: 3,
  BestSelling: 4,
  Rating: 5,
  Newest: 6,
} as const;

export type ProductSortBy = (typeof ProductSortBy)[keyof typeof ProductSortBy];
