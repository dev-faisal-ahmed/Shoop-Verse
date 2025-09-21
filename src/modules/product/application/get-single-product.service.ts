import { PRODUCT_REPOSITORY_TOKEN } from 'src/common/tokens';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from 'src/domain/product/product.repository.interface';

@Injectable()
export class GetSingleProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string) {
    const productDetails = await this.productRepository.findOneWithCategory(id);
    if (!productDetails) throw new NotFoundException('Product not found');

    const { imageUrl, ...restProduct } = productDetails.product.toResponse();
    const category = productDetails.category.toResponse();

    return {
      ...restProduct,
      ...(imageUrl && { imageUrl }),
      category,
    };
  }
}
