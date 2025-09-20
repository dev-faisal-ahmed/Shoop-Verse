import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CATEGORY_REPOSITORY_TOKEN } from 'src/common/tokens';
import { ICategoryRepository } from 'src/domain/category/category.repository.interface';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findOneWithProductCount(id);
    if (!category) throw new NotFoundException('Category not found!');
    if (category.productCount > 0)
      throw new BadRequestException(
        'Category can bot be deleted as it has products!',
      );

    await this.categoryRepository.deleteOne(id);
  }
}
