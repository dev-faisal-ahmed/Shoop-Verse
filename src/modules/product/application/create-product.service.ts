import {
  FILE_UPLOADER_TOKEN,
  ID_GENERATOR_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from 'src/common/tokens';

import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/domain/product/product.entity';
import { IProductRepository } from 'src/domain/product/product.repository.interface';
import { IFileUploader } from 'src/domain/shared/file-uploader.interface';
import { IIdGenerator } from 'src/domain/shared/id-generator.interface';

type TCreateProductServicePayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
};

@Injectable()
export class CreateProductService {
  constructor(
    @Inject(FILE_UPLOADER_TOKEN)
    private fileUploader: IFileUploader,
    @Inject(ID_GENERATOR_TOKEN)
    private idGenerator: IIdGenerator,
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private productRepository: IProductRepository,
  ) {}

  async execute(
    payload: TCreateProductServicePayload,
    imageFile: Express.Multer.File,
  ) {
    let imageUrl = '';
    let imageId = '';

    try {
      if (imageFile) {
        const response = await this.fileUploader.upload(imageFile);
        if (response) {
          imageUrl = response.url;
          imageId = response.id;
        }
      }

      const product = ProductEntity.create({
        id: this.idGenerator.generate(),
        ...payload,
        imageId,
        imageUrl,
      });

      return await this.productRepository.createProduct(product);
    } catch (error) {
      // delete image if product creation fails
      if (imageId) {
        void this.fileUploader
          .delete(imageId)
          .catch((error) => console.error('Failed to delete image', error));
      }

      throw error;
    }
  }
}
