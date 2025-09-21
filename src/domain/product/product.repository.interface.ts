import { TMeta } from 'src/common/dto/api-response.dto';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from '../category/category.entity';

export type TProductFilter = {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

export type TProductWithPagination = {
  products: ProductEntity[];
  meta: TMeta;
};

export type TProductDetails = {
  product: ProductEntity;
  category: CategoryEntity;
};

export abstract class IProductRepository {
  abstract createProduct(payload: ProductEntity): Promise<ProductEntity>;
  abstract findAll(filter: TProductFilter): Promise<TProductWithPagination>;
  abstract findOne(id: string): Promise<TProductDetails | null>;
}
