import {IsString, IsNotEmpty, MinLength, MaxLength} from "class-validator";

export class CreateSpecializationDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;
}
