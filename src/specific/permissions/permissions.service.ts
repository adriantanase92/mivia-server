import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {CreatePermissionDto} from "./dto/create-permission.dto";
import {Permission, PermissionDocument} from "./schemas/permission.schema";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectModel(Permission.name)
        private readonly permissionModel: Model<PermissionDocument>
    ) {}

    async createOne(
        createPermissionData: CreatePermissionDto
    ): Promise<Permission> {
        const permission = await new this.permissionModel(
            createPermissionData
        ).save();
        return permission;
    }

    async find(
        entityFilterQuery: FilterQuery<Permission> = {}
    ): Promise<Permission[] | null> {
        return this.permissionModel.find(entityFilterQuery);
    }

    async findById(id: string): Promise<Permission> {
        const existingPermission = await this.permissionModel.findById(id);
        if (!existingPermission) {
            throw new NotFoundException();
        }
        return existingPermission;
    }
}
