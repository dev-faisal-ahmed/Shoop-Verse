import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  PASSWORD_HASHER_TOKEN,
  TOKEN_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/common/tokens';

import { IPasswordHasher } from 'src/domain/user/password-hasher.interface';
import { ITokenService } from 'src/domain/user/token-service.interface';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

type LoginServicePayload = {
  email: string;
  password: string;
};

type LoginServiceResponse = {
  accessToken: string;
  refreshToken: string;
};

// The LoginService handles the business logic for user authentication.
@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
  ) {}

  async login(payload: LoginServicePayload): Promise<LoginServiceResponse> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) throw new NotFoundException('User not found.');

    const isPasswordValid = await user.comparePassword(
      payload.password,
      this.passwordHasher,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials.');

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      name: user.username,
      email: user.email,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: user.id,
    });

    return { accessToken, refreshToken };
  }
}
