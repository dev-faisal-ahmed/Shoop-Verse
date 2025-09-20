import {
  TFile,
  IFileUploader,
  TUploadResult,
} from 'src/domain/shared/file-uploader.interface';

import { Injectable } from '@nestjs/common';
import { cloudinary } from 'src/common/cloudinary.config';

@Injectable()
export class CloudinaryFileUploader implements IFileUploader {
  upload(file: TFile): Promise<TUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'product-images' },
        (error, result) => {
          if (error) return reject(new Error(error.message));
          if (!result) return reject(new Error('Failed to upload image'));
          resolve({ id: result.public_id, url: result.secure_url });
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      void cloudinary.uploader.destroy(id, (error) => {
        if (error) return reject(new Error('Failed to delete image'));
        resolve();
      });
    });
  }
}
