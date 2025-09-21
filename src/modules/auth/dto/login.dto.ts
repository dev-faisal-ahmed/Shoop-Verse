import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, { message: 'Email is not valid' })
  @ApiProperty({
    description: 'Email of the user',
    example: 'faisal@gmail.com',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password has to be a string' })
  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
  })
  password: string;
}
