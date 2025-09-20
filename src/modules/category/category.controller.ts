import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateCategoryService } from './application/create-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { GetCategoriesService } from './application/get-categories.service';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly getCategoriesService: GetCategoriesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() dto: CreateCategoryDto) {
    const response = await this.createCategoryService.execute(dto);
    return ApiResponseDto.success('Category created successfully', response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategories() {
    const response = await this.getCategoriesService.execute();
    return ApiResponseDto.success('Categories fetched successfully', response);
  }
}
