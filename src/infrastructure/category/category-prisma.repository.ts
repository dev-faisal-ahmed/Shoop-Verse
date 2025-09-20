import {
  ICategoryRepository,
  TCategoryWithProductCount,
} from 'src/domain/category/category.repository.interface';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CategoryEntity } from 'src/domain/category/category.entity';
import { Injectable } from '@nestjs/common';

type CategoryModel = Prisma.CategoryGetPayload<{
  select: { id: true; name: true; description: true };
}>;

@Injectable()
export class CategoryPrismaRepository implements ICategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const prismaCategory = await this.prismaService.category.create({
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
      select: this.getSelect(),
    });

    return this.toDomain(prismaCategory);
  }

  async isCategoryExist(name: string): Promise<boolean> {
    const category = await this.prismaService.category.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!category;
  }

  async findAllWithProductCount(): Promise<TCategoryWithProductCount[]> {
    const categories = await this.prismaService.category.findMany({
      select: { ...this.getSelect(), products: { select: { id: true } } },
    });

    return categories.map((category) => ({
      category: this.toDomain(category),
      productCount: category.products.length,
    }));
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      select: this.getSelect(),
    });

    if (!category) return null;

    return this.toDomain(category);
  }

  // helper
  private toDomain(prismaCategory: CategoryModel): CategoryEntity {
    return CategoryEntity.create({
      id: prismaCategory.id,
      name: prismaCategory.name,
      description: prismaCategory.description,
    });
  }

  private getSelect(): Prisma.CategorySelect {
    return { id: true, name: true, description: true };
  }
}
