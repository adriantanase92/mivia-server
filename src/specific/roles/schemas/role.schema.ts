import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform, Type} from "class-transformer";
import {Document, ObjectId} from "mongoose";
import * as mongoose from "mongoose";
import {Permission} from "src/specific/permissions/schemas/permission.schema";
import {UserType} from "src/specific/users/schemas/user.schema";

export type RoleDocument = Role & Document;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true
    }
})
export class Role {
    @Transform(({key, obj}) => obj[key])
    _id: ObjectId;

    @Prop({
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        trim: true,
        unique: true
    })
    name: UserType;

    @Prop({
        type: [{type: mongoose.Schema.Types.ObjectId, ref: Permission.name}]
    })
    @Type(() => Permission)
    permissions: Permission[];
}

const RoleSchema = SchemaFactory.createForClass(Role);

export {RoleSchema};
