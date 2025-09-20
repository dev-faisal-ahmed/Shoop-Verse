import { UserEntity } from './user.entity';

export abstract class IUserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract isUserExist(email: string): Promise<boolean>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
}
