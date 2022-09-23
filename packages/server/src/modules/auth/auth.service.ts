import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserResourceRaw } from '../users/users.resource';
import { ConfigService } from '@nestjs/config';
import { LoginResource } from '@core/resources/auth/login.resource';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(username: string, password: string): Promise<UserResourceRaw> {
        return await this.usersService.findByUsernameAndCheckPassword(username, password);
    }

    async login(user: UserResourceRaw): Promise<LoginResource> {
        const payload = { username: user.username, sub: user.id };
        return {
            user,
            token: {
                access_token: this.jwtService.sign(payload),
                expires_in: Date.now() + (parseInt(this.configService.get('AUTH.EXPIRES_IN')) * 1000),
            },
        };
    }
}
