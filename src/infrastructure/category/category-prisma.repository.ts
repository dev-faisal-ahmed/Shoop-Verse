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
      data: category.toPersistence(),
      select: this.getSelect(),
    });

    return this.toDomain(prismaCategory);
  }

  async isCategoryExistByName(name: string): Promise<boolean> {
    const category = await this.prismaService.category.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!category;
  }

  async update(category: CategoryEntity): Promise<CategoryEntity> {
    const prismaCategory = await this.prismaService.category.update({
      where: { id: category.id },
      data: {
        name: category.name,
        description: category.description,
      },
      select: this.getSelect(),
    });

    return this.toDomain(prismaCategory);
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

  async findOneWithProductCount(
    id: string,
  ): Promise<TCategoryWithProductCount | null> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      select: { ...this.getSelect(), products: { select: { id: true } } },
    });

    if (!category) return null;

    return {
      category: this.toDomain(category),
      productCount: category.products.length,
    };
  }

  async deleteOne(id: string): Promise<void> {
    await this.prismaService.category.delete({ where: { id } });
  }

  // helper
  private toDomain(category: CategoryModel): CategoryEntity {
    return CategoryEntity.create({
      id: category.id,
      name: category.name,
      description: category.description,
    });
  }

  private getSelect(): Prisma.CategorySelect {
    return { id: true, name: true, description: true };
  }
}
