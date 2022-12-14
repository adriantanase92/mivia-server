import * as Joi from "joi";
import {Module} from "@nestjs/common";
import configuration from "./configuration";
import {AppConfigService} from "./config.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_ENV: Joi.string()
                    .valid("development", "production", "staging", "test")
                    .default("development"),
                APP_PORT: Joi.number().default(3000)
            }),
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true
        })
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService]
})
export class AppConfigModule {}
