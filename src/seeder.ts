import {
    Investigation,
    InvestigationSchema
} from "./specific/investigations/schemas/investigation.schema";
import {
    Permission,
    PermissionSchema
} from "./specific/permissions/schemas/permission.schema";
import {
    Specialization,
    SpecializationSchema
} from "./specific/specializations/schemas/specialization.schema";
import {DatabaseModule} from "./database/database.module";
import {seeder} from "nestjs-seeder";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersSeeder} from "./seeders/users.seeder";
import {User, UserSchema} from "src/specific/users/schemas/user.schema";
import {DatabaseConfigModule} from "./config/database/config.module";
import {Role, RoleSchema} from "./specific/roles/schemas/role.schema";
import {PermissionsSeeder} from "./seeders/permissions.seeder";
import {RolesSeeder} from "./seeders/roles.seeder";
import {InvestigationsSeeder} from "./seeders/investigations.seeder";
import {SpecializationsSeeder} from "./seeders/specializations.seeder";

seeder({
    imports: [
        DatabaseConfigModule,
        DatabaseModule,
        MongooseModule.forFeature([
            {name: Permission.name, schema: PermissionSchema},
            {name: Role.name, schema: RoleSchema},
            {name: User.name, schema: UserSchema},
            {name: Specialization.name, schema: SpecializationSchema},
            {name: Investigation.name, schema: InvestigationSchema}
        ])
    ]
}).run([
    PermissionsSeeder,
    RolesSeeder,
    UsersSeeder,
    InvestigationsSeeder,
    SpecializationsSeeder
]);
