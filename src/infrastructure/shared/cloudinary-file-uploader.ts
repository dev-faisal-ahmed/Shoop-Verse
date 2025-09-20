import {
  TFile,
  IFileUploader,
} from 'src/domain/shared/file-uploader.interface';

import { Injectable } from '@nestjs/common';
import { cloudinary } from 'src/common/cloudinary.config';

@Injectable()
export class CloudinaryFileUploader implements IFileUploader {
  async upload(file: TFile): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'product-images' },
        (error, result) => {
          if (error) return reject(new Error(error.message));
          if (!result?.secure_url)
            return reject(new Error('Failed to upload image'));
          resolve(result?.secure_url);
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
