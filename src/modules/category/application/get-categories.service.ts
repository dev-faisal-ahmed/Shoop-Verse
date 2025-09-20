import {
  ICategoryRepository,
  TCategoryWithProductCount,
} from 'src/domain/category/category.repository.interface';

import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY_TOKEN } from 'src/common/tokens';

@Injectable()
export class GetCategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<TCategoryWithProductCount[]> {
    const categories = await this.categoryRepository.findAllWithProductCount();
    return categories;
  }
}
