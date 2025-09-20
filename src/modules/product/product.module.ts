import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductService } from './application/create-product.service';
import { FILE_UPLOADER_TOKEN } from 'src/common/tokens';
import { CloudinaryFileUploader } from 'src/infrastructure/shared/cloudinary-file-uploader';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductService,

    {
      provide: FILE_UPLOADER_TOKEN,
      useClass: CloudinaryFileUploader,
    },
  ],
})
export class ProductModule {}
