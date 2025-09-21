import { IsOptional, IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Category ID',
    required: false,
    example: 'cat-123',
  })
  categoryId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'minPrice must be a number' })
  @Min(0, { message: 'minPrice cannot be negative' })
  @ApiProperty({ description: 'Minimum price', required: false, example: 100 })
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'maxPrice must be a number' })
  @Min(0, { message: 'maxPrice cannot be negative' })
  @ApiProperty({ description: 'Maximum price', required: false, example: 100 })
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'page must be a number' })
  @Min(1)
  @ApiProperty({ description: 'Page number', required: false, example: 1 })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'limit must be a number' })
  @Min(1)
  @ApiProperty({ description: 'Limit', required: false, example: 10 })
  limit?: number;
}
