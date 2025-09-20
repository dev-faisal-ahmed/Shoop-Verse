import { Module } from '@nestjs/common';
import { JwtTokenService } from 'src/infrastructure/user/jwt-token-service.interface';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';
import { AuthGuard } from './auth.guard';
import { TOKEN_SERVICE_TOKEN, USER_REPOSITORY_TOKEN } from '../tokens';

@Module({
  providers: [
    {
      provide: TOKEN_SERVICE_TOKEN,
      useClass: JwtTokenService,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserPrismaRepository,
    },
    AuthGuard,
  ],
  exports: [AuthGuard, TOKEN_SERVICE_TOKEN, USER_REPOSITORY_TOKEN],
})
export class AuthGuardModule {}
