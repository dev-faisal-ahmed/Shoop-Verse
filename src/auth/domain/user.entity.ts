import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export class UserEntity {
  public readonly id: string;
  public readonly email: string;
  public readonly username: string;
  public readonly password: string;

  constructor({ id, email, username, password }: UserProps) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  static async create({ email, username, password }: UserCreateProps) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new UserEntity({
      id: crypto.randomUUID(),
      email,
      username,
      password: hashedPassword,
    });
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// Types
type UserCreateProps = Pick<UserEntity, 'email' | 'username' | 'password'>;
type UserProps = Pick<UserEntity, 'id' | 'email' | 'username' | 'password'>;
