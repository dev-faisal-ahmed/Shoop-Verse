import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // create user
  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        username: user.username,
      },
    });

    return new UserEntity({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    });
  }

  // find user by email
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return new UserEntity({
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
    });
  }
}
