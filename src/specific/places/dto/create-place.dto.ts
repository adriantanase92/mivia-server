import {IsString, IsNotEmpty, MinLength, MaxLength} from "class-validator";

export class CreatePlaceDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;
}
