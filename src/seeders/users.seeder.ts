import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import {Seeder, DataFactory} from "nestjs-seeder";
import {User} from "src/specific/users/schemas/user.schema";

@Injectable()
export class UsersSeeder implements Seeder {
    constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

    async seed(): Promise<User[]> {
        const adminUser = {
            updated_at: Date.now(),
            created_at: Date.now(),
            role: new mongoose.Types.ObjectId("6358485c829c6b2446a29a00"),
            type: "admin",
            password: bcrypt.hashSync(`${process.env.ADMIN_USER_PASSWORD}`, 12),
            email: "tanase.adrian92@gmail.com",
            address: {
                country: "Romania",
                county: "Bucuresti",
                city: "Bucuresti",
                street: "Racari",
                location_number: "21",
                zip_code: "031827"
            },
            phone: "+40 771 265 324",
            full_name: "Adrian Tanase",
            last_name: "Tanase",
            first_name: "Adrian"
        };
        const users = DataFactory.createForClass(User).generate(25);
        return this.user.insertMany([adminUser, ...users], {ordered: true});
    }

    async drop(): Promise<{deletedCount: number}> {
        return this.user.deleteMany({});
    }
}
