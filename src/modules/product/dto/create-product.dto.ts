import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name has to be string' })
  name: string;

  @IsNotEmpty({ message: 'description is required' })
  @IsString({ message: 'description has to be string' })
  description: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'price is required' })
  @IsNumber({}, { message: 'price has to be a number' })
  @IsPositive({ message: 'price has to be a positive number' })
  price: number;

  @Type(() => Number)
  @IsNotEmpty({ message: 'stock is required' })
  @IsNumber({}, { message: 'stock has to be a number' })
  @IsPositive({ message: 'stock has to be a positive number' })
  stock: number;

  @IsNotEmpty({ message: 'categoryId is required' })
  @IsString({ message: 'categoryId has to be string' })
  categoryId: string;
}
