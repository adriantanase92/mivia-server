import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as mongoose from "mongoose";
import {Seeder} from "nestjs-seeder";
import {Permission} from "src/specific/permissions/schemas/permission.schema";

@Injectable()
export class PermissionsSeeder implements Seeder {
    constructor(
        @InjectModel(Permission.name)
        private readonly permission: Model<Permission>
    ) {}

    async seed(): Promise<Permission[]> {
        const permissions = [
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff409"),
                name: "view_users"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff40a"),
                name: "edit_users"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff40b"),
                name: "view_roles"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff40c"),
                name: "edit_roles"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff40d"),
                name: "view_investigations"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff40e"),
                name: "edit_investigations"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff40f"),
                name: "view_specialization"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff410"),
                name: "edit_specialization"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff411"),
                name: "view_places"
            },
            {
                _id: new mongoose.Types.ObjectId("63584502ec827bb481bff412"),
                name: "edit_places"
            }
        ];
        return this.permission.insertMany(permissions, {ordered: true});
    }

    async drop(): Promise<{deletedCount: number}> {
        return this.permission.deleteMany({});
    }
}
