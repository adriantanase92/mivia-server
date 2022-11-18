import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Query} from "mongoose";
import {FilterParams} from "src/common/models/filters";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User, UserDocument} from "./schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) {}

    async createOne(createUserData: CreateUserDto): Promise<User> {
        const user = await new this.userModel(createUserData).populate({
            path: "role",
            populate: {
                path: "permissions"
            }
        });
        const saltOrRounds = 12;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hashedPassword;
        return user.save();
    }

    count(options: FilterParams): Promise<number> {
        return this.userModel.count(options).exec();
    }

    find(
        options: FilterParams
    ): Query<
        UserDocument[],
        UserDocument,
        Record<string, never>,
        UserDocument
    > {
        return this.userModel.find(options).select({password: 0, role: 0});
    }

    async findById(id: string, full = false): Promise<User> {
        const existingUser = full
            ? await this.userModel.findOne({id}).populate({
                  path: "role",
                  populate: {
                      path: "permissions"
                  }
              })
            : await this.userModel.findById(id);

        if (!existingUser) {
            throw new NotFoundException();
        }
        return existingUser;
    }

    async findByEmail(email: string) {
        const user = await this.userModel.findOne({email});
        if (user) {
            return user;
        }
        throw new HttpException(
            "User with this email does not exist",
            HttpStatus.NOT_FOUND
        );
    }

    async update(id: string, data: UpdateUserDto) {
        data["updated_at"] = Date.now();
        const existingUser = await this.userModel.findByIdAndUpdate(
            {_id: id},
            data,
            {new: true}
        );

        if (!existingUser) {
            throw new NotFoundException(`User #${id} not found`);
        }

        return existingUser;
    }

    async deleteOne(id: string): Promise<boolean> {
        const deleteResult = await this.userModel.deleteOne({_id: id});
        return deleteResult.deletedCount >= 1;
    }
}
