import {SessionConfigService} from "src/config/session/config.service";
import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";
import {SessionConfigModule} from "src/config/session/config.module";
import {HelpersService} from "./services/helpers.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [SessionConfigModule],
            inject: [SessionConfigService],
            useFactory: async (configService: SessionConfigService) => ({
                secret: configService.jwtSecret,
                signOptions: {
                    expiresIn: `${configService.jwtExpirationTime}s`
                }
            })
        })
    ],
    providers: [HelpersService],
    exports: [JwtModule, HelpersService]
})
export class CommonModule {}
