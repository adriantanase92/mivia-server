import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform} from "class-transformer";
import {Document, ObjectId} from "mongoose";

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
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
    name: string;
}

const PermissionSchema = SchemaFactory.createForClass(Permission);

export {PermissionSchema};
