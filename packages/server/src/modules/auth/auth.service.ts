import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersResource } from '../users/users.resource';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<UsersResource> {
        return await this.usersService.findByUsernameAndCheckPassword(username, password);
    }

    async login(user: UsersResource) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}