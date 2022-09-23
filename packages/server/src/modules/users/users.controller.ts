import { Body, Controller, Get, Post, Put, Request, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { UserCreateDto, UserUpdateDto, UserUpdatePasswordDto } from '@core/dto/user';
import { userUpdatePasswordSchema, userCreateSchema, userUpdateSchema } from '@core/validation/user';
import { UserResource } from '@core/resources/user';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @UsePipes(new JoiValidationPipe(userCreateSchema))
  register(@Body() user: UserCreateDto) {
    return this.usersService.register(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req): Promise<UserResource> {
    return req.user;
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(userUpdateSchema))
  updateProfile(@Body() user: UserUpdateDto, @Request() req) {
    return this.usersService.update(req.user.id, user);
  }

  @Put('profile/password')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(userUpdatePasswordSchema))
  updatePassword(@Body() data: UserUpdatePasswordDto, @Request() req) {
    return this.usersService.updatePassword(req.user.id, data);
  }
}
