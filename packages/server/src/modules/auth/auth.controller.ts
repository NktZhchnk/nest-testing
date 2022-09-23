import { Controller, Request, Post, UseGuards, UsePipes, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { authLoginSchema } from '@core/validation/auth';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UsePipes(new JoiValidationPipe(authLoginSchema))
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
