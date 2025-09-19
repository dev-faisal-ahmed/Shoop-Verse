import { Inject, Injectable } from '@nestjs/common';
import { IIdGenerator } from 'src/domain/shared/id-generator.interface';
import { IPasswordHasher } from 'src/domain/user/password-hasher.interface';
import { UserEntity } from 'src/domain/user/user.entity';
import { UserPrismaRepository } from 'src/infrastructure/user/user-prisma.repository';
import { ID_GENERATOR_TOKEN, PASSWORD_HASHER_TOKEN } from './auth.token';

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
    private readonly userRepository: UserPrismaRepository,
    @Inject(ID_GENERATOR_TOKEN)
    private readonly idGenerator: IIdGenerator,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  public async execute(payload: RegisterServicePayload): Promise<UserEntity> {
    // Checking if user already exists with the same email
    const existingUser = await this.userRepository.findByEmail(payload.email);
    if (existingUser) throw new Error('User with this email already exists.');

    // Hash the plain-text password using the injected hasher
    const passwordHash = await this.passwordHasher.hash(payload.password);

    // Generating a new, unique ID using the injected ID generator
    const userId = this.idGenerator.generate();

    // Creating a new User domain entity. The entity is complete and valid here,
    const newUser = UserEntity.create({
      ...payload,
      id: userId,
      password: passwordHash,
    });

    // Saving the new user entity to the database via the repository
    const savedUser = await this.userRepository.create(newUser);

    return savedUser;
  }
}
