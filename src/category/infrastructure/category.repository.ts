import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CategoryEntity } from '../domain/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create category
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

  // Get all categories with products count
  async getCategoriesWithProductCount(): Promise<CategoryWithProductCount[]> {
    const products = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        products: { select: { id: true } },
      },
    });

    return products.map(({ id, name, description, products }) => ({
      category: new CategoryEntity({ id, name, description }),
      productCount: products.length,
    }));
  }

  // Helpers
  async isCategoryExist(name: string): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!category;
  }
}

// types
type CategoryWithProductCount = {
  category: CategoryEntity;
  productCount: number;
};
