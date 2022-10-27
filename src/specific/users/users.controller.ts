import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {AuthGuard} from "src/auth/guards/auth.guard";
import {FilterParams, FilterResults} from "src/common/models/filters";
import ParamsWithId from "src/common/models/params-with-id";
import MongooseClassSerializerInterceptor from "src/utils/mongoose-class-serializer.interceptor";
import {HasPermission} from "../permissions/decorators/has-permission.decorator";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./schemas/user.schema";
import {UsersService} from "./users.service";

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @HasPermission("users")
    @UseGuards(AuthGuard)
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.usersService.createOne(user);
    }

    @Get()
    async getAllUsers(
        @Query() {s, sort, page: pageParam}: FilterParams
    ): Promise<FilterResults<User>> {
        let options = {};

        if (s) {
            options = {
                $or: [
                    {first_name: new RegExp(s.toString(), "i")},
                    {last_name: new RegExp(s.toString(), "i")},
                    {email: new RegExp(s.toString(), "i")},
                    {phone: new RegExp(s.toString(), "i")}
                ]
            };
        }

        const query = this.usersService.find(options);

        if (sort) {
            query.sort({first_name: sort as any});
        }

        const page: number = parseInt(pageParam as any) || 1;
        const limit = 9;
        const total = await this.usersService.count(options);

        const data = await query
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    }

    @Get(":id")
    async getUserById(@Param() {id}: ParamsWithId): Promise<User> {
        const user = await this.usersService.findById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @Patch(":id")
    @HasPermission("users")
    @UseGuards(AuthGuard)
    async updateUser(
        @Param() {id}: ParamsWithId,
        @Body() userData: UpdateUserDto
    ) {
        return this.usersService.update(id, userData);
    }

    @Delete(":id")
    @HasPermission("users")
    @UseGuards(AuthGuard)
    async deleteUser(@Param() {id}: ParamsWithId): Promise<boolean> {
        const result = this.usersService.deleteOne(id);

        if (result) {
            return result;
        }

        throw new HttpException("Users not found", HttpStatus.NOT_FOUND);
    }
}
