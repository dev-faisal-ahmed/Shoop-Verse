import {
  ITokenService,
  TAccessTokenPayload,
  TRefreshTokenPayload,
} from 'src/domain/user/token-service.interface';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/config';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: TAccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: jwtConfig.accessTokenSecret,
      expiresIn: jwtConfig.accessTokenExpiresIn,
    });
  }

  verifyAccessToken(token: string): TAccessTokenPayload {
    return this.jwtService.verify(token, {
      secret: jwtConfig.accessTokenSecret,
    });
  }

  generateRefreshToken(payload: TRefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: jwtConfig.refreshTokenSecret,
      expiresIn: jwtConfig.refreshTokenExpiresIn,
    });
  }

  verifyRefreshToken(token: string): TRefreshTokenPayload {
    return this.jwtService.verify(token, {
      secret: jwtConfig.refreshTokenSecret,
    });
  }
}
