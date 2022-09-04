import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsEntity } from './items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsEntity])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
