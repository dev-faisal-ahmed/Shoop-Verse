import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/infrastructure/user.repository';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UnitOfWork {
  public readonly user: UserRepository;

  constructor(private readonly prisma: PrismaService) {
    this.user = new UserRepository(this.prisma);
  }
}
