import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ITokenService } from 'src/domain/user/token-service.interface';
import { IUserRepository } from 'src/domain/user/user.repository.interface';
import { jwtConstants } from '../auth.constant';
import { TOKEN_SERVICE_TOKEN, USER_REPOSITORY_TOKEN } from './auth.token';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(token: string) {
    const payload = this.tokenService.verifyRefreshToken(token);
    if (!payload?.id) throw new UnauthorizedException('Invalid token');

    const user = await this.userRepository.findById(payload.id);
    if (!user) throw new NotFoundException('User not found!');

    const accessToken = this.tokenService.generateAccessToken({
      payload: { id: user.id, email: user.email, name: user.username },
      options: {
        expiresIn: jwtConstants.accessTokenExpiresIn!,
        secret: jwtConstants.accessTokenSecret!,
      },
    });

    return { accessToken };
  }
}
