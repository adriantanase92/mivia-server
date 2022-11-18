import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
    IsPhoneNumber,
    IsOptional
} from "class-validator";
import {Address} from "../schemas/address.schema";
import {Doctor, UserType} from "../schemas/user.schema";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly first_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly last_name: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone: string;

    @IsNotEmpty()
    readonly address: Address;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;

    @IsString()
    @IsNotEmpty()
    readonly type: UserType;

    @IsOptional()
    readonly doctor?: Doctor;
}
