import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as mongoose from "mongoose";
import {Seeder} from "nestjs-seeder";
import {Role} from "src/specific/roles/schemas/role.schema";

@Injectable()
export class RolesSeeder implements Seeder {
    constructor(
        @InjectModel(Role.name)
        private readonly role: Model<Role>
    ) {}

    async seed(): Promise<Role[]> {
        const roles = [
            {
                _id: new mongoose.Types.ObjectId("6358485c829c6b2446a29a00"),
                name: "admin",
                permissions: [
                    new mongoose.Types.ObjectId("63584502ec827bb481bff409"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40a"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40b"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40c"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40d"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40e"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40f"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff410"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff411"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff412")
                ]
            },
            {
                _id: new mongoose.Types.ObjectId("6358485c829c6b2446a29a01"),
                name: "manager",
                permissions: [
                    new mongoose.Types.ObjectId("63584502ec827bb481bff409"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40a"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40d"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40e"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40f"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff410"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff411"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff412")
                ]
            },
            {
                _id: new mongoose.Types.ObjectId("6358485c829c6b2446a29a02"),
                name: "operator",
                permissions: [
                    new mongoose.Types.ObjectId("63584502ec827bb481bff409"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40a"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40d"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff40f"),
                    new mongoose.Types.ObjectId("63584502ec827bb481bff411")
                ]
            },
            {
                _id: new mongoose.Types.ObjectId("6358485c829c6b2446a29a03"),
                name: "doctor",
                permissions: []
            },
            {
                _id: new mongoose.Types.ObjectId("6358485c829c6b2446a29a04"),
                name: "patient",
                permissions: []
            },
            {
                _id: new mongoose.Types.ObjectId("6358485c829c6b2446a29a05"),
                name: "unclassified",
                permissions: []
            }
        ];
        return this.role.insertMany(roles, {ordered: true});
    }

    async drop(): Promise<{deletedCount: number}> {
        return this.role.deleteMany({});
    }
}
