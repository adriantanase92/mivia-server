import {DatabaseModule} from "./../../database/database.module";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from "src/common/common.module";
import {PlacesController} from "./places.controller";
import {PlacesService} from "./places.service";
import {Place, PlaceSchema} from "./schemas/place.schema";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{name: Place.name, schema: PlaceSchema}]),
        CommonModule
    ],
    controllers: [PlacesController],
    providers: [PlacesService],
    exports: [PlacesService]
})
export class PlacesModule {}
