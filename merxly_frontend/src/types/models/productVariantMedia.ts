import type { MediaType } from '../enums/MediaType';

export interface ProductVariantMediaDto {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  displayOrder: number;
  isMain: boolean;
}

export interface CreateProductVariantMediaDto {
  mediaPublicId: string;
  fileName: string;
  fileExtension: string;
  fileSizeInBytes: number;
  displayOrder: number;
  isMain: boolean;
  mediaType: MediaType;
}
