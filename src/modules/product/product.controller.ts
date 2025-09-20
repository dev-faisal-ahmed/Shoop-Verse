import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { CreateProductService } from './application/create-product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageValidationPipe } from 'src/common/pipes/image-validation-pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
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
}
