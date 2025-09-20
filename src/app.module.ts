import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [PrismaModule, AuthModule, CategoryModule, ProductModule],
})
export class AppModule {}
