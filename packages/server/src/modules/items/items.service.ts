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
    private userRepository: Repository<ItemsEntity>
  ) {}

  async findAll(): Promise<ItemsResource[]> {
    const items = await this.userRepository.find();
    return items.map(ItemsResource.fromEntity);
  }

  async findById(id: number): Promise<ItemsResource> {
    const item = await this.userRepository.findOne({
      where: { id },
    });
    if (!item){
      throw new NotFoundException('item not exist');
    }
    return ItemsResource.fromEntity(item);
  }

  async create(data: ItemCreateUpdateDto): Promise<ItemsResource> {
    const item: ItemsEntity = this.userRepository.create({
      ...data,
    });
    await this.userRepository.save(item);
    return ItemsResource.fromEntity(item);
  }

  async update(id: number, data: ItemCreateUpdateDto): Promise<ItemsResource> {
    const item = await this.userRepository.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('item not exist');
    }
    this.userRepository.merge(item, data);
    await this.userRepository.save(item);
    return ItemsResource.fromEntity(item);
  }

  async delete(id: number) {
    await this.userRepository.delete({ id });
  }
}
