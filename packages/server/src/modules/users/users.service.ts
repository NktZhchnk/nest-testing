import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserCreateDto, UserUpdateDto, UserUpdatePasswordDto } from './dto';
import { UsersResource } from './users.resource';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(UsersEntity)
      private usersRepository: Repository<UsersEntity>
    ) {}

    async register(data: UserCreateDto): Promise<UsersResource> {
        const user: UsersEntity = this.usersRepository.create({
            ...data,
            password: await this.hashPassword(data.password),
        });
        await this.usersRepository.save(user);
        return UsersResource.fromEntity(user);
    }

    async findById(id: number): Promise<UsersResource> {
        const user: UsersEntity = await this.usersRepository.findOne({
            where: { id },
        });
        if (!user){
            throw new NotFoundException('user not exist');
        }
        return UsersResource.fromEntity(user);
    }

    async findByUsername(username: string): Promise<UsersResource> {
        const user: UsersEntity = await this.usersRepository.findOne({
            where: { username },
        });
        if (!user){
            throw new NotFoundException('user not exist');
        }
        return UsersResource.fromEntity(user);
    }

    async findByUsernameAndCheckPassword(username: string, password: string): Promise<UsersResource|null> {
        const user: UsersEntity = await this.usersRepository.findOne({
            where: { username },
        });
        if (!user || !await this.checkPassword(password, user.password)){
            return null;
        }
        return UsersResource.fromEntity(user);
    }

    async update(id: number, data: UserUpdateDto): Promise<UsersResource> {
        const user: UsersEntity = await this.usersRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException('user not exist');
        }
        this.usersRepository.merge(user, data);
        await this.usersRepository.save(user);
        return UsersResource.fromEntity(user);
    }

    async updatePassword(id: number, data: UserUpdatePasswordDto) {
        const user: UsersEntity = await this.usersRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException('user not exist');
        }
        if (!await this.checkPassword(data.password, user.password)){
            throw new UnprocessableEntityException('password not correct');
        }
        this.usersRepository.merge(user, {
            password: await this.hashPassword(data.new_password),
        });
        await this.usersRepository.save(user);
        return UsersResource.fromEntity(user);
    }

    async checkPassword(password: string, hash: string){
        return await bcrypt.compare(password, hash);
    }

    async hashPassword(password: string){
        return bcrypt.hash(password, await bcrypt.genSalt());
    }

    async delete(id: number) {
        await this.usersRepository.delete({ id });
    }
}
