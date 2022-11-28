import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Exclude, Transform, Type} from "class-transformer";
import {Document, ObjectId} from "mongoose";
import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import {Role} from "src/specific/roles/schemas/role.schema";
import {Address, AddressSchema} from "./address.schema";
import {Factory} from "nestjs-seeder";
import {Investigation} from "src/specific/investigations/schemas/investigation.schema";
import {Specialization} from "./../../specializations/schemas/specialization.schema";

export type UserType =
    | "admin"
    | "manager"
    | "operator"
    | "doctor"
    | "patient"
    | "unclassified";

export interface Doctor {
    specializations: Specialization[];
    investigations: Investigation[];
}

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true
    }
})
export class User {
    @Transform(({key, obj}) => obj[key])
    _id: ObjectId;

    @Factory((faker) => faker.name.firstName())
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    first_name: string;

    @Factory((faker) => faker.name.lastName())
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    })
    last_name: string;

    @Factory((faker, ctx) =>
        faker.name.fullName({
            firstName: ctx.first_name,
            lastName: ctx.last_name
        })
    )
    full_name: string;

    @Factory((faker) => faker.phone.number("+40 7## ### ###"))
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    phone: string;

    @Factory((faker) => ({
        country: faker.address.country(),
        county: faker.address.county(),
        city: faker.address.city(),
        street: faker.address.street(),
        location_number: faker.address.buildingNumber(),
        zip_code: faker.address.zipCode()
    }))
    @Prop({type: AddressSchema})
    @Type(() => Address)
    address: Address;

    @Factory((faker, ctx) =>
        faker.internet.email(ctx.first_name, ctx.last_name)
    )
    @Prop({
        type: String,
        required: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        trim: true,
        unique: true
    })
    email: string;

    @Factory(() => bcrypt.hashSync(`${process.env.ALL_USERS_PASSWORD}`, 12))
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    @Exclude()
    password: string;

    @Factory((faker) =>
        faker.helpers.arrayElement([
            new mongoose.Types.ObjectId("6358485c829c6b2446a29a01"),
            new mongoose.Types.ObjectId("6358485c829c6b2446a29a02"),
            new mongoose.Types.ObjectId("6358485c829c6b2446a29a03"),
            new mongoose.Types.ObjectId("6358485c829c6b2446a29a04")
        ])
    )
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Role.name})
    @Type(() => Role)
    role: Role;

    @Factory((faker, ctx) => {
        let type = "";

        if (ctx.role.toString() === "6358485c829c6b2446a29a01") {
            type = "manager";
        }
        if (ctx.role.toString() === "6358485c829c6b2446a29a02") {
            type = "operator";
        }
        if (ctx.role.toString() === "6358485c829c6b2446a29a03") {
            type = "doctor";
        }
        if (ctx.role.toString() === "6358485c829c6b2446a29a04") {
            type = "patient";
        }

        return type;
    })
    @Prop({
        type: String,
        required: true
    })
    type: UserType;

    @Factory((faker, ctx) => {
        if (ctx.type === "doctor")
            return {
                specializations: faker.helpers.arrayElements(
                    [
                        "Cardiology",
                        "General surgery",
                        "Dermatology",
                        "Endocrinology",
                        "Diabetes, nutrition and metabolic diseases"
                    ],
                    2
                ),
                investigations: faker.helpers.arrayElements(
                    [
                        "Biopsy",
                        "Bronchoscopy",
                        "Colonoscopy",
                        "Physical Therapy",
                        "Vasectomy"
                    ],
                    Math.floor(Math.random() * 3) + 1
                )
            };
    })
    @Prop({
        type: Object
    })
    doctor?: Doctor;

    @Factory((faker) => faker.date.past(5))
    @Prop({
        type: Date,
        immutable: true,
        default: () => Date.now()
    })
    created_at: Date;

    @Factory((faker) => faker.date.recent())
    @Prop({
        type: Date,
        default: () => Date.now()
    })
    updated_at: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual("full_name")
    .get(function (this: UserDocument) {
        return `${this.first_name} ${this.last_name}`;
    })
    .set(function (this: UserDocument, full_name: string) {
        const [first_name, last_name] = full_name.split(" ");
        this.set({first_name, last_name});
    });

export {UserSchema};
