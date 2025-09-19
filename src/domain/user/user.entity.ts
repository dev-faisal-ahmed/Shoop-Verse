export type TUserProps = {
  id: string;
  email: string;
  username: string;
  password: string;
};

export class UserEntity {
  public readonly id: string;
  public readonly email: string;
  public readonly username: string;
  private password: string;

  constructor({ id, email, username, password }: TUserProps) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  static create(props: TUserProps): UserEntity {
    return new UserEntity(props);
  }

  getPassword(): string {
    return this.password;
  }
}
