import type { Response } from './common';

export interface FileUploadResult {
  publicId: string;
  originalUrl: string;
  fileName: string;
  fileExtension: string;
  fileSizeInBytes: number;
}

export type UploadImageResponse = Response<FileUploadResult>;
export type UploadVideoResponse = Response<FileUploadResult>;
