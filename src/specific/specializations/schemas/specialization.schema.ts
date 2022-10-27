import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform} from "class-transformer";
import {Document, ObjectId} from "mongoose";

export type SpecializationDocument = Specialization & Document;

@Schema()
export class Specialization {
    @Transform(({key, obj}) => obj[key])
    _id: ObjectId;

    @Prop({
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    name: string;
}

const SpecializationSchema = SchemaFactory.createForClass(Specialization);

export {SpecializationSchema};
