import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {UsersModule} from "src/specific/users/users.module";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {CommonModule} from "src/common/common.module";

@Module({
    imports: [CommonModule, UsersModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
