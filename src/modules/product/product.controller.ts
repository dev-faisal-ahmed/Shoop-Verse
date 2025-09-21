import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly getProductsService: GetProductsService,
    private readonly getSingleProductService: GetSingleProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile(ImageValidationPipe(1))
    file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    const response = await this.createProductService.execute({
      ...dto,
      imageFile: file,
    });

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
}
