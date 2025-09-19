import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './application/dto';
import { AuthService } from './application/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
