import {Module} from "@nestjs/common";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from "src/common/common.module";
import {DatabaseModule} from "src/database/database.module";
import {User, UserSchema} from "./schemas/user.schema";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        CommonModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
