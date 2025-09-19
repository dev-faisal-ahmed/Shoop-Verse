import {
  ITokenService,
  TTokenPayload,
} from 'src/domain/user/token-service.interface';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  verifyToken(token: string): Promise<TTokenPayload> {
    return this.jwtService.verifyAsync(token);
  }
}
