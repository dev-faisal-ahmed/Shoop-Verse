import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/category/category.repository.interface';
import { CATEGORY_REPOSITORY_TOKEN } from './category.token';
import { CategoryEntity } from 'src/domain/category/category.entity';
import { ID_GENERATOR_TOKEN } from 'src/common/constants';
import { IIdGenerator } from 'src/domain/shared/id-generator.interface';

type CreateCategoryServicePayload = {
  name: string;
  description: string;
};

@Injectable()
export class CreateCategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: ICategoryRepository,
    @Inject(ID_GENERATOR_TOKEN)
    private readonly idGenerator: IIdGenerator,
  ) {}

  async execute(
    payload: CreateCategoryServicePayload,
  ): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.isCategoryExist(
      payload.name,
    );

    if (existingCategory)
      throw new ConflictException('Category already exists.');

    const category = CategoryEntity.create({
      id: this.idGenerator.generate(),
      ...payload,
    });

    return this.categoryRepository.create(category);
  }
}
