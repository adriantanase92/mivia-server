import {IsString, IsNotEmpty, MinLength, MaxLength} from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty()
    readonly permissions: string[];
}
