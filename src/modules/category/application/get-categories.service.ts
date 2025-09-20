import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY_TOKEN } from 'src/common/tokens';
import { ICategoryRepository } from 'src/domain/category/category.repository.interface';

@Injectable()
export class GetCategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: ICategoryRepository,
  ) {}
}
