import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CategoryService } from './application/category.service';
import { CreateCategoryDto } from './application/dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() dto: CreateCategoryDto) {
    const response = await this.categoryService.createCategory(dto);
    return ApiResponseDto.success('Category created successfully', response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllWithProductCount() {
    const response = await this.categoryService.findAllWithProductCount();
    return ApiResponseDto.success(
      'Categories retrieved successfully',
      response,
    );
  }
}
