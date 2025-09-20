export type TProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};

export class ProductEntity {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private readonly price: number;
  private readonly image: string;
  private readonly categoryId: string;

  private constructor(props: TProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.image = props.image;
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
      image: this.image,
      categoryId: this.categoryId,
    };
  }
}
