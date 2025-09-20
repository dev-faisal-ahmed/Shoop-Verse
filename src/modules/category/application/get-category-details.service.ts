import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/category/category.repository.interface';
import { CATEGORY_REPOSITORY_TOKEN } from 'src/common/tokens';
import { CategoryEntity } from 'src/domain/category/category.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class GetCategoryDetailsService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found!');

    return category;
  }
}
