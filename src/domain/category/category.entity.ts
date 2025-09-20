export type TCategoryProps = {
  id: string;
  name: string;
  description: string;
};

export class CategoryEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;

  constructor({ id, name, description }: TCategoryProps) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static create(props: TCategoryProps): CategoryEntity {
    return new CategoryEntity(props);
  }
}
