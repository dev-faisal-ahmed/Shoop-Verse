import {
  ITokenService,
  TAccessTokenPayload,
  TRefreshTokenPayload,
} from 'src/domain/user/token-service.interface';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken({ payload, options }: TAccessTokenPayload): string {
    return this.jwtService.sign(payload, options);
  }

  verifyAccessToken(token: string): TAccessTokenPayload {
    return this.jwtService.verify(token);
  }

  generateRefreshToken({ payload, options }: TRefreshTokenPayload): string {
    return this.jwtService.sign(payload, options);
  }

  verifyRefreshToken(token: string): TRefreshTokenPayload {
    return this.jwtService.verify(token);
  }
}
