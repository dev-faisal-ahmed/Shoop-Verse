import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CategoryEntity } from '../domain/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  // create category
  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    const created = await this.prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
    });

    return new CategoryEntity({
      id: created.id,
      name: created.name,
      description: created.description,
    });
  }

  // helpers
  async isCategoryExist(name: string): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!category;
  }
}
