import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
        
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
        await this.authService.login(user, response);
        response.send(user);
    }
}
