import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/models/user.model';
import { Response } from 'express';
import { JwtService } from "@nestjs/jwt";

export interface TokenPayload {
    userId: string;
}

@Injectable()
export class AuthService {
    constructor (
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {

    }

    async login(user: User, response: Response) {
        const tokenPayload: TokenPayload = {
            userId: user._id,
        };

        const expires = new Date();
        expires.setSeconds(
            expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
        )

        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires,
        }) 
    }
}
