import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './application/category.service';
import { UnitOfWork } from 'src/unit-of-work';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService, UnitOfWork],
})
export class CategoryModule {}
