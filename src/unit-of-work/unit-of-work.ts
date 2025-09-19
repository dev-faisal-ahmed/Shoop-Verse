import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/infrastructure/user.repository';
import { CategoryRepository } from 'src/category/infrastructure/category.repository';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UnitOfWork {
  public readonly user: UserRepository;
  public readonly category: CategoryRepository;

  constructor(private readonly prisma: PrismaService) {
    this.user = new UserRepository(this.prisma);
    this.category = new CategoryRepository(this.prisma);
  }
}
