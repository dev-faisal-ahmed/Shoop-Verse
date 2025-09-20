import { IsOptional, IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'minPrice must be a number' })
  @Min(0, { message: 'minPrice cannot be negative' })
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'maxPrice must be a number' })
  @Min(0, { message: 'maxPrice cannot be negative' })
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'page must be a number' })
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'limit must be a number' })
  @Min(1)
  limit?: number;
}
