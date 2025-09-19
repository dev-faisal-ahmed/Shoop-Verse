import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './application/auth.service';
import { UnitOfWork } from 'src/unit-of-work';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UnitOfWork],
})
export class AuthModule {}
