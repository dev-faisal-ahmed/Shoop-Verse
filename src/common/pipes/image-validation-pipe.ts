import { ParseFilePipe } from '@nestjs/common';
import { CustomImageValidatorPipe } from './custom-image-validator.pipe';

export function ImageValidationPipe(maxSizeMB = 1) {
  return new ParseFilePipe({
    validators: [new CustomImageValidatorPipe({ maxSizeMB })],
    fileIsRequired: false,
  });
}
