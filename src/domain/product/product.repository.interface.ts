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
  abstract findOneWithCategory(id: string): Promise<TProductDetails | null>;
  abstract findOne(id: string): Promise<ProductEntity | null>;
  abstract updateOne(payload: ProductEntity): Promise<ProductEntity>;
  abstract deleteOne(id: string): Promise<void>;
}
