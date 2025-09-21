export type TCategoryProps = {
  id: string;
  name: string;
  description: string;
};

type TCategoryResponse = Pick<TCategoryProps, 'id' | 'name' | 'description'>;

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
    return CategoryEntity.create({
      id: this.id,
      name: props.name ?? this.name,
      description: props.description ?? this.description,
    });
  }

  toPersistence(): TCategoryProps {
    return { id: this.id, name: this.name, description: this.description };
  }

  toResponse(): TCategoryResponse {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}
