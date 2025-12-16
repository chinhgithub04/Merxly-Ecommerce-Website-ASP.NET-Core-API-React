export const MediaType = {
  Image: 0,
  Video: 1,
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];
