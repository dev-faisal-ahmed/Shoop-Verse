import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';

import { Request } from 'express';
import { ITokenService } from 'src/domain/user/token-service.interface';
import { IUserRepository } from 'src/domain/user/user.repository.interface';
import { TOKEN_SERVICE_TOKEN, USER_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class AuthGuard implements CanActivate {
  private bearer = 'bearer';

  constructor(
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    if (!token)
      throw new UnauthorizedException(
        'No token has been provided, please provide a token',
      );

    try {
      const payload = this.tokenService.verifyAccessToken(token);
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
    const authorization = request.headers.authorization ?? '';
    const [type, token] = authorization.split(' ');
    if (type.toLowerCase() !== this.bearer) return '';
    return token;
  }
}
