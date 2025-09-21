import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'name has to be string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'description has to be string' })
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'price has to be a number' })
  @IsPositive({ message: 'price has to be a positive number' })
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'stock has to be a number' })
  @IsPositive({ message: 'stock has to be a positive number' })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'categoryId has to be string' })
  categoryId?: string;
}
