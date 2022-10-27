import {SessionConfigService} from "src/config/session/config.service";
import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";
import {SessionConfigModule} from "src/config/session/config.module";

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
    providers: [],
    exports: [JwtModule]
})
export class CommonModule {}
