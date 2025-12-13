export const UserRole = {
  Admin: 'Admin',
  Customer: 'Customer',
  StoreOwner: 'StoreOwner',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
