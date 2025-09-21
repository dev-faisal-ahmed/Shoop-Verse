import { FileValidator, Injectable } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export type CustomImageValidatorOptions = {
  maxSizeMB: number;
};

@Injectable()
export class CustomImageValidatorPipe extends FileValidator<
  CustomImageValidatorOptions,
  IFile
> {
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'image/svg+xml',
  ];

  constructor(
    protected readonly validationOptions: CustomImageValidatorOptions,
  ) {
    super(validationOptions);
  }

  isValid(file?: IFile): boolean | Promise<boolean> {
    if (!file) {
      return true; // Optional file
    }

    const maxSizeBytes = this.validationOptions.maxSizeMB * 1024 * 1024;

    // Check file size
    if (file.size && file.size > maxSizeBytes) {
      return false;
    }

    // Check MIME type
    if (!file.mimetype || !this.allowedMimeTypes.includes(file.mimetype)) {
      return false;
    }

    return true;
  }

  buildErrorMessage(file?: IFile): string {
    const maxSizeMB = this.validationOptions.maxSizeMB;

    if (file?.size && file.size > maxSizeMB * 1024 * 1024) {
      return `File size too large. Maximum size is ${maxSizeMB}MB`;
    }

    if (file?.mimetype && !this.allowedMimeTypes.includes(file.mimetype)) {
      return `Invalid file type: ${file.mimetype}. Allowed types: ${this.allowedMimeTypes.join(', ')}`;
    }

    return 'File validation failed';
  }
}
