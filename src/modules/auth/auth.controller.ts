import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import type { Response, Request } from 'express';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { RegisterService } from './application/register.service';
import { LoginService } from './application/login.service';
import { RefreshTokenService } from './application/refresh.token.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import {
  accessTokenApiResponse,
  loginApiResponse,
  registerApiResponse,
} from './auth.doc';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse(registerApiResponse.success)
  @ApiBadRequestResponse(registerApiResponse.validationError)
  @ApiConflictResponse(registerApiResponse.conflictError)
  async register(@Body() dto: RegisterDto) {
    const response = await this.registerService.execute(dto);
    return ApiResponseDto.success('User registered successfully', response);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login and receive access token; sets refresh token cookie',
  })
  @ApiCreatedResponse(loginApiResponse.success)
  @ApiBadRequestResponse(loginApiResponse.validationError)
  @ApiUnauthorizedResponse(loginApiResponse.unauthorized)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.loginService.login(dto);

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.json(
      ApiResponseDto.success('User logged in successfully', { accessToken }),
    );
  }

  @Get('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Exchange refresh token cookie for a new access token',
  })
  @ApiCreatedResponse(accessTokenApiResponse.success)
  @ApiUnauthorizedResponse(accessTokenApiResponse.unauthorized)
  async getAccessToken(@Req() req: Request) {
    const refreshToken = req.cookies['refresh-token'] as string;

    if (!refreshToken)
      throw new UnauthorizedException('No token has been provided');

    const accessToken = await this.refreshTokenService.execute(refreshToken);
    return ApiResponseDto.success('Access token retrieved successfully', {
      accessToken,
    });
  }
}
