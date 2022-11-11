import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import {AppModule} from "./app.module";
import {AppConfigService} from "./config/app/config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig: AppConfigService = app.get(AppConfigService);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            disableErrorMessages: appConfig.env === "PRODUCTION" ? true : false
        })
    );
    app.setGlobalPrefix("api");
    app.use(cookieParser());
    app.enableCors({
        origin: appConfig.adminUrl,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Access-Control-Allow-Origin"]
    });
    await app.listen(appConfig.port);
}
bootstrap();
