import {Exclude} from "class-transformer";
import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsOptional
} from "class-validator";

export class UpdatePlaceDto {
    @IsOptional()
    @Exclude()
    _id?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
    readonly name?: string;
}
