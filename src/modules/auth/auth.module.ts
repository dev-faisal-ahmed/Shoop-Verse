import {
  PASSWORD_HASHER_TOKEN,
  TOKEN_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from './application/auth.token';

import { Module } from '@nestjs/common';
import { ID_GENERATOR_TOKEN } from 'src/common/constants';
import { AuthController } from './auth.controller';
import { RegisterService } from './application/register.service';
import { LoginService } from './application/login.service';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';
import { CryptoIdGenerator } from 'src/infrastructure/shared/crypto-id-generator';
import { BcryptPasswordHasher } from 'src/infrastructure/user/bcrypt-password-hasher';
import { JwtTokenService } from 'src/infrastructure/user/jwt-token-service.interface';
import { RefreshTokenService } from './application/refresh.token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [
    RegisterService,
    LoginService,
    RefreshTokenService,

    { provide: USER_REPOSITORY_TOKEN, useClass: UserPrismaRepository },
    { provide: ID_GENERATOR_TOKEN, useClass: CryptoIdGenerator },
    { provide: PASSWORD_HASHER_TOKEN, useClass: BcryptPasswordHasher },
    { provide: TOKEN_SERVICE_TOKEN, useClass: JwtTokenService },
  ],
})
export class AuthModule {}
