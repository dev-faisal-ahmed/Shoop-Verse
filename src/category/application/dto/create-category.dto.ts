import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'name can not be empty' })
  @IsString({ message: 'name has to be string' })
  name: string;

  @IsNotEmpty({ message: 'description can not be empty' })
  @IsString({ message: 'description has to be string' })
  description: string;
}
