import {IsNumber, Min, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

type Sort = "asc" | "desc";

export class FilterParams {
    @IsOptional()
    @IsString()
    s?: string;

    @IsOptional()
    @IsString()
    sort?: Sort;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;
}

export interface FilterResults<T> {
    readonly data: T[] | [];
    readonly total: number;
    readonly page: number;
    readonly last_page: number;
}
