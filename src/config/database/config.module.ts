import {DatabaseConfigService} from "./config.service";
import * as Joi from "joi";
import {Module} from "@nestjs/common";
import configuration from "./configuration";
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
            validationSchema: Joi.object({}),
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true
        })
    ],
    providers: [ConfigService, DatabaseConfigService],
    exports: [ConfigService, DatabaseConfigService]
})
export class DatabaseConfigModule {}
