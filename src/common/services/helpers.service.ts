import {Injectable} from "@nestjs/common";

@Injectable()
export class HelpersService {
    convertSortOrder(sortOrder: string): number {
        return sortOrder === "asc" ? 1 : -1;
    }
}
