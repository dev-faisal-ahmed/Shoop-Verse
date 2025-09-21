import {
  IProductRepository,
  TProductDetails,
  TProductFilter,
  TProductWithPagination,
} from 'src/domain/product/product.repository.interface';

import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ProductEntity } from 'src/domain/product/product.entity';
import { CategoryEntity } from 'src/domain/category/category.entity';

type TProductModel = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    price: true;
    stock: true;
    imageUrl: true;
    imageId: true;
    categoryId: true;
  };
}>;

@Injectable()
export class ProductPrismaRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    console.log('Creating product: ', product);
    const prismaProduct = await this.prisma.product.create({
      data: product.toPersistence(),
    });

    return this.toDomain(prismaProduct);
  }

  async findAll(filter: TProductFilter): Promise<TProductWithPagination> {
    const { categoryId, minPrice, maxPrice, page = 1, limit = 10 } = filter;

    const where: Prisma.ProductWhereInput = {
      ...(categoryId && { categoryId }),
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),
    };

    const products = await this.prisma.product.findMany({
      where,
      select: this.getSelect(),
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.product.count({ where });
    const totalPage = Math.ceil(total / limit);

    const productEntities = products.map((product) => this.toDomain(product));

    return {
      products: productEntities,
      meta: { page, limit, total, totalPage },
    };
  }

  async findOneWithCategory(id: string): Promise<TProductDetails | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: {
        ...this.getSelect(),
        category: { select: { id: true, name: true, description: true } },
      },
    });

    if (!product) return null;

    return {
      product: this.toDomain(product),
      category: CategoryEntity.create({
        id: product.category.id,
        name: product.category.name,
        description: product.category.description,
      }),
    };
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: this.getSelect(),
    });

    if (!product) return null;

    return this.toDomain(product);
  }

  async updateOne({ id, ...payload }: ProductEntity): Promise<ProductEntity> {
    const prismaProduct = await this.prisma.product.update({
      where: { id },
      data: payload,
      select: this.getSelect(),
    });

    return this.toDomain(prismaProduct);
  }

  // helpers
  private toDomain(product: TProductModel): ProductEntity {
    return ProductEntity.create({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageId: product.imageId ?? '',
      imageUrl: product.imageUrl ?? '',
      categoryId: product.categoryId,
    });
  }

  getSelect(): Prisma.ProductSelect {
    return {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      imageUrl: true,
      imageId: true,
      categoryId: true,
    };
  }
}
