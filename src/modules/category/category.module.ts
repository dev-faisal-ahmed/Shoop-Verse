import {
  CATEGORY_REPOSITORY_TOKEN,
  ID_GENERATOR_TOKEN,
} from 'src/common/tokens';

import { Module } from '@nestjs/common';
import { CreateCategoryService } from './application/create-category.service';
import { CategoryPrismaRepository } from 'src/infrastructure/category/category-prisma.repository';
import { CryptoIdGenerator } from 'src/infrastructure/shared/crypto-id-generator';
import { CategoryController } from './category.controller';
import { AuthGuardModule } from 'src/common/guard/auth.guard.module';

@Module({
  imports: [AuthGuardModule],
  controllers: [CategoryController],
  providers: [
    CreateCategoryService,

    { provide: CATEGORY_REPOSITORY_TOKEN, useClass: CategoryPrismaRepository },
    { provide: ID_GENERATOR_TOKEN, useClass: CryptoIdGenerator },
  ],
})
export class CategoryModule {}
