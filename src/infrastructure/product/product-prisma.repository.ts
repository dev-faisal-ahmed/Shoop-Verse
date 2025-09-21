import {
  IProductRepository,
  TProductDetails,
  TProductFilter,
  TProductSearchFilter,
  TProductSearchResult,
  TProductWithPagination,
} from 'src/domain/product/product.repository.interface';

import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ProductEntity } from 'src/domain/product/product.entity';
import { CategoryEntity } from 'src/domain/category/category.entity';
import { TMeta } from 'src/common/dto/api-response.dto';

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

  // create product
  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    console.log('Creating product: ', product);
    const prismaProduct = await this.prisma.product.create({
      data: product.toPersistence(),
    });

    return this.toDomain(prismaProduct);
  }

  // find all products with pagination
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
      skip: this.getSkip(page, limit),
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.product.count({ where });
    const productEntities = products.map((product) => this.toDomain(product));

    return {
      products: productEntities,
      meta: this.getMeta(page, limit, total),
    };
  }

  // search products with pagination
  async search(filter: TProductSearchFilter): Promise<TProductSearchResult> {
    const { search, page = 1, limit = 10 } = filter;

    const where: Prisma.ProductWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const prismaProduct = await this.prisma.product.findMany({
      where,
      select: this.getSelect(),
      skip: this.getSkip(page, limit),
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.product.count({ where });
    const productEntities = prismaProduct.map((product) =>
      this.toDomain(product),
    );

    return {
      products: productEntities,
      meta: this.getMeta(page, limit, total),
    };
  }

  // find one product with category
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

  // find one product
  async findOne(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: this.getSelect(),
    });

    if (!product) return null;

    return this.toDomain(product);
  }

  // update one product
  async updateOne({ id, ...payload }: ProductEntity): Promise<ProductEntity> {
    const prismaProduct = await this.prisma.product.update({
      where: { id },
      data: payload,
      select: this.getSelect(),
    });

    return this.toDomain(prismaProduct);
  }

  // delete one product
  async deleteOne(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
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

  private getSelect(): Prisma.ProductSelect {
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

  private getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  private getMeta(page: number, limit: number, total: number): TMeta {
    return { page, limit, total, totalPage: Math.ceil(total / limit) };
  }
}
