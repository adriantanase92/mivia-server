import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post
} from "@nestjs/common";
import ParamsWithId from "src/common/models/params-with-id";
import {HasPermission} from "../permissions/decorators/has-permission.decorator";
import {CreateRoleDto} from "./dto/create-role.dto";
import {RolesService} from "./roles.service";
import {Role} from "./schemas/role.schema";

@Controller("roles")
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post()
    @HasPermission("roles")
    async createRole(@Body() role: CreateRoleDto): Promise<Role> {
        return await this.rolesService.createOne(role);
    }

    @Get()
    @HasPermission("roles")
    async getAllRoles(): Promise<Role[]> {
        return this.rolesService.find();
    }

    @Get(":id")
    @HasPermission("roles")
    async getRoleById(@Param() {id}: ParamsWithId): Promise<Role> {
        const role = await this.rolesService.findById(id);

        if (!role) {
            throw new NotFoundException();
        }

        return role;
    }
}
