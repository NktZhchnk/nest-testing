import { UsersEntity } from './users.entity';

export class UsersResource {
  id: number;
  username: string;
  first_name: string;
  last_name: string;

  static fromEntity(userEntity: UsersEntity): UsersResource {
    return {
      id: userEntity.id,
      username: userEntity.username,
      first_name: userEntity.first_name,
      last_name: userEntity.last_name,
    };
  }
}