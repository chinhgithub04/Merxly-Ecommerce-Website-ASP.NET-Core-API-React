import type { MediaType } from '../enums/MediaType';

export interface ProductVariantMediaDto {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  displayOrder: number;
  isMain: boolean;
}
