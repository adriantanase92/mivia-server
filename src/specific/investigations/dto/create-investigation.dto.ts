import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Min,
    IsNumber
} from "class-validator";

export class CreateInvestigationDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    readonly price: number;
}
