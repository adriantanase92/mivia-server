import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

/**
 * Service dealing with session config based operations.
 *
 * @class
 */
@Injectable()
export class SessionConfigService {
    constructor(private configService: ConfigService) {}

    get jwtSecret(): string {
        return this.configService.get<string>("session.jwtSecret");
    }
    get jwtExpirationTime(): string {
        return this.configService.get<string>("session.jwtExpirationTime");
    }
}
