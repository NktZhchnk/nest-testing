import { ItemsEntity } from './items.entity';

export class ItemsResource {
  id: number;
  name: string;
  count: number;
  price: number;

  static fromEntity(itemEntity: ItemsEntity): ItemsResource {
    return {
      id: itemEntity.id,
      name: itemEntity.name,
      count: itemEntity.count || 0,
      price: itemEntity.price || 0,
    };
  }
}