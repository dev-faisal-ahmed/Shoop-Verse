import { CreateCategoryDto } from './dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../domain/category.entity';
import { UnitOfWork } from 'src/unit-of-work';

@Injectable()
export class CategoryService {
  constructor(private readonly uow: UnitOfWork) {}

  async createCategory(dto: CreateCategoryDto) {
    const isCategoryExist = await this.uow.category.existsByName(dto.name);
    if (isCategoryExist)
      throw new ConflictException('Category already exists!');

    const category = CategoryEntity.create(dto);
    const createdCategory = await this.uow.category.create(category);

    return {
      id: createdCategory.id,
      name: createdCategory.name,
      description: createdCategory.description,
    };
  }

  async findAllWithProductCount() {
    return this.uow.category.findAllWithProductCount();
  }
}
