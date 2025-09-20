import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateCategoryService } from './application/create-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly createCategoryService: CreateCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() dto: CreateCategoryDto) {
    const response = await this.createCategoryService.execute(dto);
    return ApiResponseDto.success('Category created successfully', response);
  }
}
