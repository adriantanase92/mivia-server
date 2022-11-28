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
    UseGuards
} from "@nestjs/common";
import {AuthGuard} from "src/auth/guards/auth.guard";
import {FilterParams, FilterResults} from "src/common/models/filters";
import ParamsWithId from "src/common/models/params-with-id";
import {HelpersService} from "src/common/services/helpers.service";
import {HasPermission} from "../permissions/decorators/has-permission.decorator";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./schemas/user.schema";
import {UsersService} from "./users.service";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
        private helpersService: HelpersService
    ) {}

    @Post()
    @HasPermission("users")
    @UseGuards(AuthGuard)
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.usersService.createOne(user);
    }

    @Get()
    async getAllUsers(
        @Query()
        {
            search,
            sortName,
            sortOrder,
            page: pageParam,
            limit,
            type
        }: FilterParams
    ): Promise<FilterResults<User>> {
        let options = {};

        if (search) {
            options = {
                $or: [
                    {first_name: new RegExp(search.toString(), "i")},
                    {last_name: new RegExp(search.toString(), "i")},
                    {email: new RegExp(search.toString(), "i")},
                    {phone: new RegExp(search.toString(), "i")}
                ]
            };
        }

        if (type) {
            options["$and"] = [{type}];
        }

        const query = this.usersService.find(options);

        if (sortName) {
            const sort = {};
            sortName = sortName === "full_name" ? "first_name" : sortName;
            sort[sortName] = sortOrder;
            query.sort(sort);
        }

        const page: number = parseInt(pageParam as any) || 1;
        const numberOfItems = limit ? limit : 10;
        const total = await this.usersService.count(options);

        const data = await query
            .skip((page - 1) * numberOfItems)
            .limit(numberOfItems)
            .exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / numberOfItems)
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
