import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly getProductsService: GetProductsService,
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
}
