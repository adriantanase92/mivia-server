import {Exclude} from "class-transformer";
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";
import {Doctor} from "../schemas/user.schema";

export class UpdateUserDto {
    @IsOptional()
    @Exclude()
    _id?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    doctor?: Doctor;
}
