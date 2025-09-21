import { TMeta } from 'src/common/dto/api-response.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/product/product.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from 'src/common/tokens';
import { ProductEntity } from 'src/domain/product/product.entity';

type TSearchProductService = {
  search?: string;
  page?: number;
  limit?: number;
};

type TSearchProductResult = {
  products: ProductEntity[];
  meta: TMeta;
};

@Injectable()
export class SearchProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute({
    search,
    page,
    limit,
  }: TSearchProductService): Promise<TSearchProductResult> {
    // when search is empty or undefined return no products
    if (!search || search.trim() === '') {
      return {
        products: [],
        meta: { total: 0, page: page ?? 1, limit: limit ?? 10, totalPage: 0 },
      };
    }

    return this.productRepository.search({ search, page, limit });
  }
}
