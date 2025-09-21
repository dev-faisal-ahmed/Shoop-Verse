export type TProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  imageId: string;
  categoryId: string;
};

type TProductResponse = Pick<
  TProductProps,
  'id' | 'name' | 'description' | 'imageUrl' | 'price' | 'stock' | 'categoryId'
>;

export class ProductEntity {
  public readonly id: string;
  public name: string;
  public description: string;
  public price: number;
  public stock: number;
  public imageUrl: string;
  public imageId: string;
  public categoryId: string;

  constructor(props: TProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.stock = props.stock;
    this.imageUrl = props.imageUrl;
    this.imageId = props.imageId;
    this.categoryId = props.categoryId;
  }

  static create(props: TProductProps): ProductEntity {
    return new ProductEntity(props);
  }

  update(props: Partial<Omit<TProductProps, 'id'>>): ProductEntity {
    return ProductEntity.create({
      id: this.id,
      name: props.name ?? this.name,
      description: props.description ?? this.description,
      price: props.price ?? this.price,
      stock: props.stock ?? this.stock,
      imageUrl: props.imageUrl ?? this.imageUrl,
      imageId: props.imageId ?? this.imageId,
      categoryId: props.categoryId ?? this.categoryId,
    });
  }

  toPersistence(): TProductProps {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      imageUrl: this.imageUrl,
      imageId: this.imageId,
      categoryId: this.categoryId,
    };
  }

  toResponse(): TProductResponse {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.price,
      stock: this.stock,
      categoryId: this.categoryId,
    };
  }
}
