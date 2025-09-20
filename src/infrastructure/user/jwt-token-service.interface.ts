import {
  ITokenService,
  TAccessTokenPayload,
  TRefreshTokenPayload,
} from 'src/domain/user/token-service.interface';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements ITokenService {
  private readonly jwtConstants = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  };

  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: TAccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.jwtConstants.accessTokenSecret,
      expiresIn: this.jwtConstants.accessTokenExpiresIn,
    });
  }

  verifyAccessToken(token: string): TAccessTokenPayload {
    return this.jwtService.verify(token, {
      secret: this.jwtConstants.accessTokenSecret,
    });
  }

  generateRefreshToken(payload: TRefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.jwtConstants.refreshTokenSecret,
      expiresIn: this.jwtConstants.refreshTokenExpiresIn,
    });
  }

  verifyRefreshToken(token: string): TRefreshTokenPayload {
    return this.jwtService.verify(token, {
      secret: this.jwtConstants.refreshTokenSecret,
    });
  }
}
