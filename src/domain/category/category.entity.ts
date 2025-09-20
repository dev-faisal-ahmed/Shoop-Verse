export type TCategoryProps = {
  id: string;
  name: string;
  description: string;
};

export class CategoryEntity {
  public readonly id: string;
  public name: string;
  public description: string;

  constructor({ id, name, description }: TCategoryProps) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static create(props: TCategoryProps): CategoryEntity {
    return new CategoryEntity(props);
  }

  update(props: Partial<TCategoryProps>): CategoryEntity {
    return CategoryEntity.create({ ...this, ...props });
  }
}
