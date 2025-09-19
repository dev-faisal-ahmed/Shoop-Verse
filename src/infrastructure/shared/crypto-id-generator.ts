import * as crypto from 'crypto';

import { Injectable } from '@nestjs/common';
import { IIdGenerator } from 'src/domain/shared/id-generator.interface';

@Injectable()
export class CryptoIdGenerator implements IIdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
