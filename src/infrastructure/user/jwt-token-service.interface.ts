import {
  ITokenService,
  AccessTokenCreationData,
  RefreshTokenCreationData,
  TAccessTokenPayload,
  TRefreshTokenPayload,
} from 'src/domain/user/token-service.interface';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/modules/auth/auth.constant';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken({ payload, options }: AccessTokenCreationData): string {
    return this.jwtService.sign(payload, options);
  }

  verifyAccessToken(token: string): TAccessTokenPayload {
    return this.jwtService.verify(token, {
      secret: jwtConstants.accessTokenSecret,
    });
  }

  generateRefreshToken({ payload, options }: RefreshTokenCreationData): string {
    return this.jwtService.sign(payload, options);
  }

  verifyRefreshToken(token: string): TRefreshTokenPayload {
    return this.jwtService.verify(token, {
      secret: jwtConstants.refreshTokenSecret,
    });
  }
}
