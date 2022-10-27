import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

/**
 * Service dealing with database config based operations.
 *
 * @class
 */
@Injectable()
export class DatabaseConfigService {
    constructor(private configService: ConfigService) {}

    get uri(): string {
        return this.configService.get<string>("database.uri");
    }
    get username(): string {
        return this.configService.get<string>("database.username");
    }
    get password(): string {
        return this.configService.get<string>("database.password");
    }
    get name(): string {
        return this.configService.get<string>("database.name");
    }
    get hostname(): string {
        return this.configService.get<string>("database.hostname");
    }
}
