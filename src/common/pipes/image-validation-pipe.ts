import { ParseFilePipe } from '@nestjs/common';

export function ImageValidationPipe() {
  return new ParseFilePipe({
    fileIsRequired: false,
  });
}
