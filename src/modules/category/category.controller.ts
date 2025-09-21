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

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  createCategoryApiResponse,
  deleteCategoryApiResponse,
  getCategoriesApiResponse,
  getCategoryDetailsApiResponse,
  updateCategoryApiResponse,
} from './category.doc';

import { CreateCategoryService } from './application/create-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { GetCategoriesService } from './application/get-categories.service';
import { UpdateCategoryService } from './application/update-category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategoryService } from './application/delete-category.service';
import { GetCategoryDetailsService } from './application/get-category-details.service';

@ApiTags('Category')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly getCategoriesService: GetCategoriesService,
    private readonly updateCategoryService: UpdateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
    private readonly getCategoryDetailsService: GetCategoryDetailsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse(createCategoryApiResponse.success)
  @ApiBadRequestResponse(createCategoryApiResponse.validationError)
  @ApiUnauthorizedResponse(createCategoryApiResponse.unauthorized)
  @ApiConflictResponse(createCategoryApiResponse.conflict)
  async createCategory(@Body() dto: CreateCategoryDto) {
    const response = await this.createCategoryService.execute(dto);
    return ApiResponseDto.success('Category created successfully', response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all categories with product counts' })
  @ApiOkResponse(getCategoriesApiResponse.success)
  @ApiUnauthorizedResponse(getCategoriesApiResponse.unauthorized)
  async getCategories() {
    const response = await this.getCategoriesService.execute();
    return ApiResponseDto.success('Categories fetched successfully', response);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get details of a single category' })
  @ApiOkResponse(getCategoryDetailsApiResponse.success)
  @ApiNotFoundResponse(getCategoryDetailsApiResponse.notFound)
  @ApiUnauthorizedResponse(getCategoryDetailsApiResponse.unauthorized)
  async getCategoryDetails(@Param('id') id: string) {
    const response = await this.getCategoryDetailsService.execute(id);

    return ApiResponseDto.success(
      'Category details fetched successfully',
      response,
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse(updateCategoryApiResponse.success)
  @ApiNotFoundResponse(updateCategoryApiResponse.notFound)
  @ApiUnauthorizedResponse(updateCategoryApiResponse.unauthorized)
  @ApiConflictResponse(updateCategoryApiResponse.conflict)
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    const response = await this.updateCategoryService.execute(id, dto);
    return ApiResponseDto.success('Category updated successfully', response);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a category' })
  @ApiOkResponse(deleteCategoryApiResponse.success)
  @ApiNotFoundResponse(deleteCategoryApiResponse.notFound)
  @ApiUnauthorizedResponse(deleteCategoryApiResponse.unauthorized)
  @ApiBadRequestResponse(deleteCategoryApiResponse.badRequest)
  async deleteCategory(@Param('id') id: string) {
    await this.deleteCategoryService.execute(id);
    return ApiResponseDto.success('Category deleted successfully');
  }
}
