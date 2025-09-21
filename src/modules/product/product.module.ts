import {
  FILE_UPLOADER_TOKEN,
  ID_GENERATOR_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from 'src/common/tokens';

import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductService } from './application/create-product.service';
import { CloudinaryFileUploader } from 'src/infrastructure/shared/cloudinary-file-uploader';
import { CryptoIdGenerator } from 'src/infrastructure/shared/crypto-id-generator';
import { ProductPrismaRepository } from 'src/infrastructure/product/product-prisma.repository';
import { GetProductsService } from './application/get-products.service';
import { AuthGuardModule } from 'src/common/guard/auth.guard.module';
import { GetSingleProductService } from './application/get-single-product.service';
import { UpdateProductService } from './application/update-product.service';

@Module({
  imports: [AuthGuardModule],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetProductsService,
    GetSingleProductService,
    UpdateProductService,

    {
      provide: FILE_UPLOADER_TOKEN,
      useClass: CloudinaryFileUploader,
    },
    {
      provide: ID_GENERATOR_TOKEN,
      useClass: CryptoIdGenerator,
    },
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: ProductPrismaRepository,
    },
  ],
})
export class ProductModule {}
