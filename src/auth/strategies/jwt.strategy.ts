import { Injectable } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "../../users/users.service";
import { Request } from "express";
import { TokenPayload } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Authentication,
            ]),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({userId}: TokenPayload) {
        return this.usersService.getUser({ _id: userId });
    }
}