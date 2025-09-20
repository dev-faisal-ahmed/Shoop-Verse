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

export class ProductEntity {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private readonly price: number;
  private readonly stock: number;
  private readonly imageUrl: string;
  protected readonly imageId: string;
  private readonly categoryId: string;

  private constructor(props: TProductProps) {
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
}
