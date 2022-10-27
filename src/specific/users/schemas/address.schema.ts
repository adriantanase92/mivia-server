import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform} from "class-transformer";
import {Document, ObjectId} from "mongoose";
import {Factory} from "nestjs-seeder";

export type AddressDocument = Address & Document;

@Schema()
export class Address {
    @Transform(({key, obj}) => obj[key])
    _id: ObjectId;

    @Factory((faker) => faker.address.country())
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    country: string;

    @Factory((faker) => faker.address.county())
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    county: string;

    @Factory((faker) => faker.address.city())
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    city: string;

    @Factory((faker) => faker.address.street())
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    street: string;

    @Factory((faker) => faker.address.buildingNumber())
    @Prop({
        type: Number,
        required: true,
        min: 0,
        trim: true
    })
    location_number: number;

    @Factory((faker) => faker.address.zipCode())
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    zip_code: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

export {AddressSchema};
