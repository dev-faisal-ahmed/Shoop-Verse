import {
  TFile,
  IFileUploader,
  TUploadResult,
} from 'src/domain/shared/file-uploader.interface';

import { Injectable } from '@nestjs/common';
import { cloudinary } from 'src/common/cloudinary.config';

@Injectable()
export class CloudinaryFileUploader implements IFileUploader {
  async upload(file: TFile): Promise<TUploadResult> {
    // Convert buffer to base64 data URI to avoid stream issues in serverless
    const base64 = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'product-images',
      resource_type: 'image',
    });

    return { id: result.public_id, url: result.secure_url };
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
