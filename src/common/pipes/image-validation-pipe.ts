import {
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';

export function ImageValidationPipe(maxSizeMB = 1) {
  return new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
      new MaxFileSizeValidator({ maxSize: maxSizeMB * 1024 * 1024 }),
    ],
    fileIsRequired: false,
  });
}
