import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY_TOKEN } from 'src/common/tokens';
import { IProductRepository } from 'src/domain/product/product.repository.interface';

export type TProductFilter = {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

@Injectable()
export class GetProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  execute(filter: TProductFilter) {
    return this.productRepository.findAll(filter);
  }
}
