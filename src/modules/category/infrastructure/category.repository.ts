import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CategoryEntity } from '../domain/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
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
      // add createdAt/updatedAt if part of domain
    });
  }

  async findAllWithProductCount(): Promise<CategoryWithProductCountDto[]> {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        products: { select: { id: true } },
      },
    });

    return categories.map(
      ({ id, name, description, products }) =>
        new CategoryWithProductCountDto(
          new CategoryEntity({ id, name, description }),
          products.length,
        ),
    );
  }

  async existsByName(name: string): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!category;
  }
}

// DTO for better clarity
export class CategoryWithProductCountDto {
  constructor(
    public readonly category: CategoryEntity,
    public readonly productCount: number,
  ) {}
}
