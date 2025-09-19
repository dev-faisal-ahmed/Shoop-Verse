import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { IPasswordHasher } from 'src/domain/user/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
