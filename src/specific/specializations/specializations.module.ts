import {DatabaseModule} from "src/database/database.module";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from "src/common/common.module";
import {
    Specialization,
    SpecializationSchema
} from "./schemas/specialization.schema";
import {SpecializationsController} from "./specializations.controller";
import {SpecializationsService} from "./specializations.service";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([
            {name: Specialization.name, schema: SpecializationSchema}
        ]),
        CommonModule
    ],
    controllers: [SpecializationsController],
    providers: [SpecializationsService],
    exports: [SpecializationsService]
})
export class SpecializationsModule {}
