import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductFilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search query',
    required: false,
    example: 'Laptop',
  })
  q?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Page number',
    required: false,
    example: 1,
  })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Limit',
    required: false,
    example: 10,
  })
  limit?: number;
}
