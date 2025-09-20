import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/product/product.repository.interface';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ProductEntity } from 'src/domain/product/product.entity';

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
