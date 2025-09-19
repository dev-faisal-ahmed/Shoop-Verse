import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './application/auth.service';
import { UnitOfWork } from 'src/unit-of-work';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UnitOfWork],
})
export class AuthModule {}
