import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from "src/common/common.module";
import {DatabaseModule} from "src/database/database.module";
import {InvestigationsController} from "./investigations.controller";
import {InvestigationsService} from "./investigations.service";
import {
    Investigation,
    InvestigationSchema
} from "./schemas/investigation.schema";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([
            {name: Investigation.name, schema: InvestigationSchema}
        ]),
        CommonModule
    ],
    controllers: [InvestigationsController],
    providers: [InvestigationsService],
    exports: [InvestigationsService]
})
export class InvestigationsModule {}
