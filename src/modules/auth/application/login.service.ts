import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PASSWORD_HASHER_TOKEN, TOKEN_SERVICE_TOKEN } from './auth.token';
import { IPasswordHasher } from 'src/domain/user/password-hasher.interface';
import { ITokenService } from 'src/domain/user/token-service.interface';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';
import { jwtConstants } from '../auth.constant';

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
    private readonly userRepository: UserPrismaRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
  ) {}

  public async login(
    payload: LoginServicePayload,
  ): Promise<LoginServiceResponse> {
    // Finding the user by their email using the repository.
    const user = await this.userRepository.findByEmail(payload.email);

    // If no user is found, throw an authentication error.
    if (!user) throw new NotFoundException('User not found.');

    // Compare the plain-text password with the stored hashed password.
    const isPasswordValid = await this.passwordHasher.compare(
      payload.password,
      user.getPassword(),
    );

    // If the passwords do not match, throw an authentication error.
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials.');

    // If authentication is successful, generate a JWT using the user's ID.
    const tokenPayload = {
      id: user.id,
      name: user.username,
      email: user.email,
    };

    const accessToken = this.tokenService.generateAccessToken({
      payload: tokenPayload,
      options: {
        expiresIn: jwtConstants.accessTokenExpiresIn!,
        secret: jwtConstants.accessTokenSecret!,
      },
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      payload: { id: user.id },
      options: {
        expiresIn: jwtConstants.refreshTokenExpiresIn!,
        secret: jwtConstants.refreshTokenSecret!,
      },
    });

    // Return the generated token.
    return { accessToken, refreshToken };
  }
}
