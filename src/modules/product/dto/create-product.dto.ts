import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name has to be string' })
  @ApiProperty({
    description: 'Product name',
    required: true,
    example: 'Laptop Pro',
  })
  name: string;

  @IsNotEmpty({ message: 'description is required' })
  @IsString({ message: 'description has to be string' })
  @ApiProperty({
    description: 'Product description',
    required: true,
    example: 'A high-end laptop for professionals',
  })
  description: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'price is required' })
  @IsNumber({}, { message: 'price has to be a number' })
  @IsPositive({ message: 'price has to be a positive number' })
  @ApiProperty({
    description: 'Product price',
    required: true,
    example: 1499.99,
  })
  price: number;

  @Type(() => Number)
  @IsNotEmpty({ message: 'stock is required' })
  @IsNumber({}, { message: 'stock has to be a number' })
  @IsPositive({ message: 'stock has to be a positive number' })
  @ApiProperty({ description: 'Product stock', required: true, example: 50 })
  stock: number;

  @IsNotEmpty({ message: 'categoryId is required' })
  @IsString({ message: 'categoryId has to be string' })
  @ApiProperty({
    description: 'Product category ID',
    required: true,
    example: 'cat_abc',
  })
  categoryId: string;
}
