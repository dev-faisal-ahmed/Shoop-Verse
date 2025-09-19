import * as crypto from 'crypto';

export class CategoryEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;

  constructor({ id, name, description }: CategoryProps) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static create({ name, description }: CategoryCreateProps) {
    return new CategoryEntity({
      id: crypto.randomUUID(),
      name,
      description,
    });
  }
}

// Types
export type CategoryCreateProps = Pick<CategoryEntity, 'name' | 'description'>;
export type CategoryProps = Pick<CategoryEntity, 'id' | 'name' | 'description'>;
