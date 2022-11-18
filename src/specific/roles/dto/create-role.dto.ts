import {IsString, IsNotEmpty, MinLength, MaxLength} from "class-validator";
import {UserType} from "src/specific/users/schemas/user.schema";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly name: UserType;

    @IsNotEmpty()
    readonly permissions: string[];
}
