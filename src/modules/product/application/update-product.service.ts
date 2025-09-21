import {
  FILE_UPLOADER_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from 'src/common/tokens';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from 'src/domain/product/product.entity';
import { IProductRepository } from 'src/domain/product/product.repository.interface';
import { IFileUploader } from 'src/domain/shared/file-uploader.interface';

type TUpdateDateProductServicePayload = Partial<
  Pick<ProductEntity, 'name' | 'description' | 'categoryId' | 'price' | 'stock'>
>;

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
    @Inject(FILE_UPLOADER_TOKEN)
    private readonly fileUploader: IFileUploader,
  ) {}

  async execute(
    id: string,
    payload: TUpdateDateProductServicePayload,
    imageFile: Express.Multer.File,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException('Product not found');

    let newImageId = '';
    let newImageUrl = '';

    try {
      if (imageFile) {
        const response = await this.fileUploader.upload(imageFile);
        if (response) {
          newImageId = response.id;
          newImageUrl = response.url;
        }
      }

      const updatedProduct = product.update({
        ...payload,
        ...(newImageId && { imageId: newImageId, imageUrl: newImageUrl }),
      });

      const savedProduct =
        await this.productRepository.updateOne(updatedProduct);

      // deleting old image when new image is uploaded
      if (imageFile && product.imageId) {
        void this.fileUploader
          .delete(product.imageId)
          .catch((error) => console.error('Failed to delete old image', error));
      }

      return savedProduct;
    } catch (error) {
      // deleting new image when product update fails
      if (newImageId) {
        void this.fileUploader.delete(newImageId).catch((error) => {
          console.error('Failed to delete new image', error);
        });
      }

      throw error;
    }
  }
}
