import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateCategoryService } from './application/create-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { GetCategoriesService } from './application/get-categories.service';
import { UpdateCategoryService } from './application/update-category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategoryService } from './application/delete-category.service';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly getCategoriesService: GetCategoriesService,
    private readonly updateCategoryService: UpdateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    const response = await this.updateCategoryService.execute({ id, ...dto });
    return ApiResponseDto.success('Category updated successfully', response);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCategory(@Param('id') id: string) {
    await this.deleteCategoryService.execute(id);
    return ApiResponseDto.success('Category deleted successfully');
  }
}
