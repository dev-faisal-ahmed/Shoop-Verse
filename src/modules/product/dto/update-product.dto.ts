import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'name has to be string' })
  @ApiProperty({
    description: 'Product name',
    required: false,
    example: 'Laptop Pro',
  })
  name?: string;

  @IsOptional()
  @IsString({ message: 'description has to be string' })
  @ApiProperty({
    description: 'Product description',
    required: false,
    example: 'A high-end laptop for professionals',
  })
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'price has to be a number' })
  @IsPositive({ message: 'price has to be a positive number' })
  @ApiProperty({
    description: 'Product price',
    required: false,
    example: 1499.99,
  })
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'stock has to be a number' })
  @IsPositive({ message: 'stock has to be a positive number' })
  @ApiProperty({
    description: 'Product stock',
    required: false,
    example: 50,
  })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'categoryId has to be string' })
  @ApiProperty({
    description: 'Product category ID',
    required: false,
    example: 'cat_abc',
  })
  categoryId?: string;
}
