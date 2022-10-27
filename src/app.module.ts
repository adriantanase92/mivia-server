import {Module} from "@nestjs/common";
import {UsersModule} from "./specific/users/users.module";
import {CommonModule} from "./common/common.module";
import {PermissionsModule} from "./specific/permissions/permissions.module";
import {RolesModule} from "./specific/roles/roles.module";
import {InvestigationsModule} from "./specific/investigations/investigations.module";
import {SpecializationsModule} from "./specific/specializations/specializations.module";
import {PlacesModule} from "./specific/places/places.module";
import {AppConfigModule} from "./config/app/config.module";
import {DatabaseModule} from "./database/database.module";
import {AuthModule} from "./auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {PermissionGuard} from "./specific/permissions/guards/permissions.guard";

@Module({
    imports: [
        AppConfigModule,
        DatabaseModule,
        CommonModule,
        UsersModule,
        PermissionsModule,
        RolesModule,
        InvestigationsModule,
        SpecializationsModule,
        PlacesModule,
        AuthModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: PermissionGuard
        }
    ]
})
export class AppModule {}
