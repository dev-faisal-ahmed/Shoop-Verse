import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IIdGenerator } from 'src/domain/shared/id-generator.interface';
import { IPasswordHasher } from 'src/domain/user/password-hasher.interface';
import { UserEntity } from 'src/domain/user/user.entity';
import { ID_GENERATOR_TOKEN, PASSWORD_HASHER_TOKEN } from './auth.token';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

// types
type RegisterServicePayload = {
  username: string;
  email: string;
  password: string;
};

// The RegisterService handles business logic of registering a new user
@Injectable()
export class RegisterService {
  constructor(
    private readonly userRepository: IUserRepository,
    @Inject(ID_GENERATOR_TOKEN)
    private readonly idGenerator: IIdGenerator,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  public async execute(payload: RegisterServicePayload): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(payload.email);
    if (existingUser)
      throw new ConflictException('User with this email already exists.');

    const passwordHash = await this.passwordHasher.hash(payload.password);

    const userId = this.idGenerator.generate();

    const newUser = UserEntity.create({
      ...payload,
      id: userId,
      password: passwordHash,
    });

    const savedUser = await this.userRepository.create(newUser);

    return savedUser;
  }
}
