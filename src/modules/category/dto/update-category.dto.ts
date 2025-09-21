import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Home Appliances' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'All kind of home appliances' })
  description?: string;
}
