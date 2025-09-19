import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { RegisterService } from './application/register.service';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './application/login.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    const response = await this.registerService.execute(dto);
    return ApiResponseDto.success('User registered successfully', response);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const response = await this.loginService.login(dto);
    return ApiResponseDto.success('User logged in successfully', response);
  }
}
