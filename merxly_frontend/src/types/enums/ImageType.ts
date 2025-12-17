export const ImageType = {
  Product: 0,
  Avatar: 1,
  Banner: 2,
  Logo: 3,
  Category: 4,
} as const;

export type ImageType = (typeof ImageType)[keyof typeof ImageType];
