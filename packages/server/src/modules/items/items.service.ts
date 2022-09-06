import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ItemsResource } from './items.resource';
import { ItemsEntity } from './items.entity';
import { ItemCreateUpdateDto } from './dto/item-create-update.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsEntity)
    private itemsRepository: Repository<ItemsEntity>
  ) {}

  async findAll(): Promise<ItemsResource[]> {
    const items = await this.itemsRepository.find();
    return items.map(ItemsResource.fromEntity);
  }

  async findById(id: number): Promise<ItemsResource> {
    const item = await this.itemsRepository.findOne({
      where: { id },
    });
    if (!item){
      throw new NotFoundException('item not exist');
    }
    return ItemsResource.fromEntity(item);
  }

  async create(data: ItemCreateUpdateDto): Promise<ItemsResource> {
    const item: ItemsEntity = this.itemsRepository.create({
      ...data,
    });
    await this.itemsRepository.save(item);
    return ItemsResource.fromEntity(item);
  }

  async update(id: number, data: ItemCreateUpdateDto): Promise<ItemsResource> {
    const item = await this.itemsRepository.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('item not exist');
    }
    this.itemsRepository.merge(item, data);
    await this.itemsRepository.save(item);
    return ItemsResource.fromEntity(item);
  }

  async delete(id: number) {
    await this.itemsRepository.delete({ id });
  }
}
