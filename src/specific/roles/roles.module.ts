import {DatabaseModule} from "src/database/database.module";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from "src/common/common.module";
import {RolesController} from "./roles.controller";
import {RolesService} from "./roles.service";
import {Role, RoleSchema} from "./schemas/role.schema";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
        CommonModule
    ],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService]
})
export class RolesModule {}
