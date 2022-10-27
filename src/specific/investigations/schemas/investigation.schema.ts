import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform} from "class-transformer";
import {Document, ObjectId} from "mongoose";

export type InvestigationDocument = Investigation & Document;

@Schema()
export class Investigation {
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

    @Prop({
        type: Number,
        required: true,
        min: 0,
        trim: true
    })
    price: number;
}

const InvestigationSchema = SchemaFactory.createForClass(Investigation);

export {InvestigationSchema};
