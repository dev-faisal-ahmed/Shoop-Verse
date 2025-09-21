import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @ApiProperty({ description: 'Name of the user', example: 'Faisal Ahmed' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  @ApiProperty({
    description: 'Email of the user',
    example: 'faisal@gmail.com',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  @ApiProperty({ description: 'Password of the user', example: '123456' })
  password: string;
}
