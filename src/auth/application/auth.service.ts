import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UnitOfWork } from 'src/unit-of-work';
import { UserEntity } from '../domain/user.entity';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly uow: UnitOfWork) {}

  async register(dto: RegisterDto) {
    const isUserExist = await this.uow.user.findUserByEmail(dto.email);

    if (isUserExist) throw new ConflictException('User already exists');

    const user = await UserEntity.create(dto);
    const createdUser = await this.uow.user.createUser(user);

    return ApiResponseDto.success('User created successfully', {
      id: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
    });
  }
}
