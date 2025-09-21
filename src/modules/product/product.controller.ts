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

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly getProductsService: GetProductsService,
    private readonly getSingleProductService: GetSingleProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile(ImageValidationPipe(1))
    file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    const response = await this.createProductService.execute(dto, file);
    return ApiResponseDto.success('Product created successfully', response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts(@Query() query: ProductFilterDto) {
    const { products, meta } = await this.getProductsService.execute(query);
    return ApiResponseDto.success(
      'Products fetched successfully',
      products,
      meta,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('id') id: string) {
    const productDetails = await this.getSingleProductService.execute(id);
    return ApiResponseDto.success(
      'Product fetched successfully',
      productDetails,
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe(1))
    file: Express.Multer.File,
    @Body() dto: UpdateProductDto,
  ) {
    const response = await this.updateProductService.execute(id, dto, file);
    return ApiResponseDto.success('Product updated successfully', response);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string) {
    await this.deleteProductService.execute(id);
    return ApiResponseDto.success('Product deleted successfully');
  }
}
