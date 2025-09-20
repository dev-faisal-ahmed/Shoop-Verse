import { CategoryEntity } from './category.entity';

export type TCategoryWithProductCount = {
  category: CategoryEntity;
  productCount: number;
};

export abstract class ICategoryRepository {
  abstract create(category: CategoryEntity): Promise<CategoryEntity>;
  abstract isCategoryExist(name: string): Promise<boolean>;
  abstract findAllWithProductCount(): Promise<TCategoryWithProductCount[]>;
  abstract findById(id: string): Promise<CategoryEntity | null>;
}
