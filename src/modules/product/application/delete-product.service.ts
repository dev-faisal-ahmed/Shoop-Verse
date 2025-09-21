import {
  FILE_UPLOADER_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from 'src/common/tokens';

import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/product/product.repository.interface';
import { IFileUploader } from 'src/domain/shared/file-uploader.interface';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
    @Inject(FILE_UPLOADER_TOKEN)
    private readonly fileUploader: IFileUploader,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.deleteOne(id);

    // delete images if product has been deleted
    if (product.imageId) {
      void this.fileUploader.delete(product.imageId).catch((error) => {
        console.error('Failed to delete old image', error);
      });
    }
  }
}
