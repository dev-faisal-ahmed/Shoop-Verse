import { CreateCategoryDto } from './dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../domain/category.entity';
import { UnitOfWork } from 'src/unit-of-work';

@Injectable()
export class CategoryService {
  constructor(private readonly uow: UnitOfWork) {}

  async createCategory(dto: CreateCategoryDto) {
    const isCategoryExist = await this.uow.category.isCategoryExist(dto.name);
    if (isCategoryExist)
      throw new ConflictException('Category already exists!');

    const category = CategoryEntity.create(dto);
    const createdCategory = await this.uow.category.createCategory(category);

    return ApiResponseDto.success('Category created successfully', {
      id: createdCategory.id,
      name: createdCategory.name,
      description: createdCategory.description,
    });
  }

  async getCategoriesWithProductsCount() {
    const categories = await this.uow.category.getCategoriesWithProductCount();

    return ApiResponseDto.success(
      'Categories retrieved successfully',
      categories,
    );
  }
}
