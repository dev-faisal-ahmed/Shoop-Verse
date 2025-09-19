import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { UnitOfWork } from 'src/unit-of-work';
import { UserEntity } from '../domain/user.entity';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly uow: UnitOfWork,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const isUserExist = await this.uow.user.findByEmail(dto.email);

    if (isUserExist) throw new ConflictException('User already exists');

    const user = await UserEntity.create(dto);
    const createdUser = await this.uow.user.create(user);

    return {
      id: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.uow.user.findByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');

    const isPasswordMatch = await user.comparePassword(dto.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      id: user.id,
      name: user.username,
      email: user.email,
    });

    return { token };
  }
}
