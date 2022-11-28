import {IsNumber, Min, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class FilterParams {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    sortName?: string;

    @IsOptional()
    @IsString()
    sortOrder?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(5)
    limit?: number;

    @IsOptional()
    @IsString()
    type?: string;
}

export interface FilterResults<T> {
    readonly data: T[] | [];
    readonly total: number;
    readonly page: number;
    readonly last_page: number;
}
