import {ConfigService} from "@nestjs/config";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {DatabaseConfigModule} from "src/config/database/config.module";

@Module({
    imports: [
        DatabaseConfigModule,
        MongooseModule.forRootAsync({
            imports: [DatabaseConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>("database.uri")
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
