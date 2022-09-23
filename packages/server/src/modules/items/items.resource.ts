import { ItemsEntity } from './items.entity';
import { ItemResource as ItemResourceRaw } from '@core/resources/item'

export { ItemResourceRaw };
export class ItemsResource extends ItemResourceRaw{
  static fromEntity(itemEntity: ItemsEntity): ItemResourceRaw {
    return {
      id: itemEntity.id,
      name: itemEntity.name,
      count: itemEntity.count || 0,
      price: itemEntity.price || 0,
    };
  }
}
