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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  createProductApiResponse,
  deleteProductApiResponse,
  getProductDetailsApiResponse,
  getProductsApiResponse,
  searchProductsApiResponse,
  updateProductApiResponse,
} from './product.doc';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { CreateProductService } from './application/create-product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageValidationPipe } from 'src/common/pipes/image-validation-pipe';
import { ProductFilterDto } from './dto/product-filter.dto';
import { GetProductsService } from './application/get-products.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { GetSingleProductService } from './application/get-single-product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductService } from './application/update-product.service';
import { DeleteProductService } from './application/delete-product.service';
import { SearchProductFilterDto } from './dto/search-product-filter.dto';
import { SearchProductService } from './application/search-product.service';
import { memoryStorage } from 'multer';

@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly getProductsService: GetProductsService,
    private readonly searchProductService: SearchProductService,
    private readonly getSingleProductService: GetSingleProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 1 * 1024 * 1024 }, // 1MB, keep in sync with ImageValidationPipe
    }),
  )
  @ApiOperation({ summary: 'Create a new product with an optional image' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse(createProductApiResponse.success)
  @ApiBadRequestResponse(createProductApiResponse.validationError)
  @ApiUnauthorizedResponse(createProductApiResponse.unauthorized)
  async createProduct(
    @UploadedFile(ImageValidationPipe())
    file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    console.log(file);
    const response = await this.createProductService.execute(dto, file);
    return ApiResponseDto.success('Product created successfully', response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a paginated list of products with filters' })
  @ApiOkResponse(getProductsApiResponse.success)
  @ApiUnauthorizedResponse(getProductsApiResponse.unauthorized)
  async getProducts(@Query() query: ProductFilterDto) {
    const { products, meta } = await this.getProductsService.execute(query);
    return ApiResponseDto.success(
      'Products fetched successfully',
      products,
      meta,
    );
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search for products by name or description' })
  @ApiOkResponse(searchProductsApiResponse.success)
  @ApiUnauthorizedResponse(searchProductsApiResponse.unauthorized)
  async searchProducts(@Query() query: SearchProductFilterDto) {
    const { products, meta } = await this.searchProductService.execute({
      search: query.q,
      page: query.page,
      limit: query.limit,
    });

    return ApiResponseDto.success(
      query.q
        ? `Search results for "${query.q}"`
        : 'Please provide a search query',
      products,
      meta,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get details of a single product' })
  @ApiOkResponse(getProductDetailsApiResponse.success)
  @ApiNotFoundResponse(getProductDetailsApiResponse.notFound)
  @ApiUnauthorizedResponse(getProductDetailsApiResponse.unauthorized)
  async getSingleProduct(@Param('id') id: string) {
    const productDetails = await this.getSingleProductService.execute(id);
    return ApiResponseDto.success(
      'Product fetched successfully',
      productDetails,
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 1 * 1024 * 1024 }, // 1MB, keep in sync with ImageValidationPipe
    }),
  )
  @ApiOperation({ summary: 'Update a product with an optional new image' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse(updateProductApiResponse.success)
  @ApiNotFoundResponse(updateProductApiResponse.notFound)
  @ApiUnauthorizedResponse(updateProductApiResponse.unauthorized)
  async updateProduct(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe())
    file: Express.Multer.File,
    @Body() dto: UpdateProductDto,
  ) {
    const response = await this.updateProductService.execute(id, dto, file);
    return ApiResponseDto.success('Product updated successfully', response);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiOkResponse(deleteProductApiResponse.success)
  @ApiNotFoundResponse(deleteProductApiResponse.notFound)
  @ApiUnauthorizedResponse(deleteProductApiResponse.unauthorized)
  async deleteProduct(@Param('id') id: string) {
    await this.deleteProductService.execute(id);
    return ApiResponseDto.success('Product deleted successfully');
  }
}
