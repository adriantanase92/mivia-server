import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role, RoleDocument} from "./schemas/role.schema";

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private readonly roleModel: Model<RoleDocument>
    ) {}

    async find(
        entityFilterQuery: FilterQuery<Role> = {}
    ): Promise<Role[] | null> {
        return this.roleModel.find(entityFilterQuery);
    }

    async findById(id: string): Promise<Role> {
        const existingRole = await this.roleModel.findById(id);

        if (!existingRole) {
            throw new HttpException(`Role not found`, HttpStatus.NOT_FOUND);
        }

        return existingRole;
    }

    async createOne(createRoleData: CreateRoleDto): Promise<Role> {
        const role = await new this.roleModel(createRoleData).populate(
            "permissions"
        );
        return role.save();
    }
}
