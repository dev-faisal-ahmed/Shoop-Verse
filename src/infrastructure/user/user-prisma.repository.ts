// src/infrastructure/user/user-prisma.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserEntity } from 'src/domain/user/user.entity';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

type UserModel = Prisma.UserGetPayload<{
  select: { id: true; email: true; username: true; password: true };
}>;

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.getPassword(),
      },
      select: this.getSelect(),
    });

    return this.toDomain(prismaUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
      select: this.getSelect(),
    });

    if (!prismaUser) return null;
    return this.toDomain(prismaUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
      select: this.getSelect(),
    });

    if (!prismaUser) return null;
    return this.toDomain(prismaUser);
  }

  async isUserExist(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !!user;
  }

  // helper methods
  private toDomain(user: UserModel): UserEntity {
    return UserEntity.create({
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
    });
  }

  private getSelect(): Prisma.UserSelect {
    return { id: true, username: true, email: true, password: true };
  }
}
