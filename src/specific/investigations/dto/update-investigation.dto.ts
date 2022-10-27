import {Exclude} from "class-transformer";
import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Min,
    IsNumber,
    IsOptional
} from "class-validator";

export class UpdateInvestigationDto {
    @IsOptional()
    @Exclude()
    _id?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
    readonly name?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @IsOptional()
    readonly price?: number;
}
