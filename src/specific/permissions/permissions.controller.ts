import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards
} from "@nestjs/common";
import {AuthGuard} from "src/auth/guards/auth.guard";
import ParamsWithId from "src/common/models/params-with-id";
import {CreatePermissionDto} from "./dto/create-permission.dto";
import {PermissionsService} from "./permissions.service";
import {Permission} from "./schemas/permission.schema";

@UseGuards(AuthGuard)
@Controller("permissions")
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) {}

    @Post()
    async createPermission(
        @Body() permission: CreatePermissionDto
    ): Promise<Permission> {
        return await this.permissionsService.createOne(permission);
    }

    @Get()
    async getAllPermissions(): Promise<Permission[]> {
        return this.permissionsService.find();
    }

    @Get(":id")
    async getPermissionById(@Param() {id}: ParamsWithId): Promise<Permission> {
        const permission = await this.permissionsService.findById(id);

        if (!permission) {
            throw new NotFoundException();
        }

        return permission;
    }
}
