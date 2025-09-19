import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './application/dto';
import { AuthService } from './application/auth.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    const response = await this.authService.register(dto);
    return ApiResponseDto.success('User registered successfully', response);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const response = await this.authService.login(dto);
    return ApiResponseDto.success('User logged in successfully', response);
  }
}
