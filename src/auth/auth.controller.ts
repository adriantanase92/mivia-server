import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UsersService} from "src/specific/users/users.service";
import * as bcrypt from "bcrypt";
import {Request, Response} from "express";
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "./guards/auth.guard";
import MongooseClassSerializerInterceptor from "src/utils/mongoose-class-serializer.interceptor";
import {User} from "src/specific/users/schemas/user.schema";

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    @Post("login")
    async login(
        @Body("email") email: string,
        @Body("password") password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException("Invalid credentials");
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie("jwt", jwt, {httpOnly: true});

        return user;
    }

    @UseGuards(AuthGuard)
    @Get("user")
    async user(@Req() request: Request) {
        const id = await this.authService.userId(request);

        return this.usersService.findById(id);
    }

    @UseGuards(AuthGuard)
    @Post("logout")
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie("jwt");

        return {
            message: "Success"
        };
    }
}
