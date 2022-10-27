import {DatabaseModule} from "src/database/database.module";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from "src/common/common.module";
import {PermissionsController} from "./permissions.controller";
import {PermissionsService} from "./permissions.service";
import {Permission, PermissionSchema} from "./schemas/permission.schema";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([
            {name: Permission.name, schema: PermissionSchema}
        ]),
        CommonModule
    ],
    controllers: [PermissionsController],
    providers: [PermissionsService],
    exports: [PermissionsService]
})
export class PermissionsModule {}
