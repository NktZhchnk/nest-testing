import { UserResource } from '../user';

export class LoginResource {
  token: {
    access_token: string;
    expires_in: number;
  };
  user: UserResource;
}
