import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  private bearer = 'bearer';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserPrismaRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('No token has been provided');

    try {
      const payload = this.jwtService.verify<TokenPayload>(token);
      if (!payload) throw new UnauthorizedException('Invalid token');

      const user = await this.userRepository.findByEmail(payload.email);
      if (!user) throw new UnauthorizedException('User not found');
      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : 'Invalid token',
      );
    }
  }

  private extractToken(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type.toLowerCase() !== this.bearer) return '';
    return token;
  }
}

// type
type TokenPayload = { id: string; name: string; email: string };
