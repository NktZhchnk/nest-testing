import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 256 })
  username: string;

  @Column('varchar', { length: 256 })
  password: string;

  @Column('varchar', { length: 256 })
  first_name: string;

  @Column('varchar', { length: 256 })
  last_name: string;
}