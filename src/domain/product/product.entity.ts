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
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly stock: number;
  public readonly imageUrl: string;
  public readonly imageId: string;
  public readonly categoryId: string;

  constructor(props: TProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.imageUrl = props.imageUrl;
    this.imageId = props.imageId;
    this.stock = props.stock;
    this.categoryId = props.categoryId;
  }

  static create(props: TProductProps): ProductEntity {
    return new ProductEntity(props);
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
