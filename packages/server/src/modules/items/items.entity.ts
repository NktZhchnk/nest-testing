import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256, unique: true })
  name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column('double')
  count: number;
}