import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CATEGORY_REPOSITORY_TOKEN } from 'src/common/tokens';

import { CategoryEntity } from 'src/domain/category/category.entity';
import { ICategoryRepository } from 'src/domain/category/category.repository.interface';

type TUpdateCategoryServicePayload = Pick<
  CategoryEntity,
  'id' | 'name' | 'description'
>;

@Injectable()
export class UpdateCategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute({ id, ...payload }: TUpdateCategoryServicePayload) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found!');

    if (payload.name) {
      const categoryByName =
        await this.categoryRepository.isCategoryExistByName(payload.name);

      if (categoryByName)
        throw new BadRequestException(
          `Category with the name : ${payload.name} already exist!`,
        );
    }

    const updatedCategory = category.update(payload);

    return this.categoryRepository.update(updatedCategory);
  }
}
