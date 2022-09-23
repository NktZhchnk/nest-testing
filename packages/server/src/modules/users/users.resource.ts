import { UsersEntity } from './users.entity';
import { UserResource as UserResourceRaw } from '@core/resources/user';

export { UserResourceRaw };
export class UsersResource extends UserResourceRaw {
  static fromEntity(userEntity: UsersEntity): UserResourceRaw {
    return {
      id: userEntity.id,
      username: userEntity.username,
      first_name: userEntity.first_name,
      last_name: userEntity.last_name,
    };
  }
}
