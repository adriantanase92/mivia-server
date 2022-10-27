import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {AuthGuard} from "src/auth/guards/auth.guard";
import ParamsWithId from "src/common/models/params-with-id";
import MongooseClassSerializerInterceptor from "src/utils/mongoose-class-serializer.interceptor";
import {HasPermission} from "../permissions/decorators/has-permission.decorator";
import {CreatePlaceDto} from "./dto/create-place.dto";
import {UpdatePlaceDto} from "./dto/update-place.dto";
import {PlacesService} from "./places.service";
import {Place} from "./schemas/place.schema";

@UseInterceptors(MongooseClassSerializerInterceptor(Place))
@Controller("places")
export class PlacesController {
    constructor(private placesService: PlacesService) {}

    @Post()
    @HasPermission("places")
    @UseGuards(AuthGuard)
    async createPlace(@Body() place: CreatePlaceDto): Promise<Place> {
        return await this.placesService.createOne(place);
    }

    @Get()
    async getAllPlaces(): Promise<Place[]> {
        return this.placesService.find();
    }

    @Get(":id")
    async getPlaceById(@Param() {id}: ParamsWithId): Promise<Place> {
        const place = await this.placesService.findById(id);

        if (!place) {
            throw new NotFoundException();
        }

        return place;
    }

    @Patch(":id")
    @HasPermission("places")
    @UseGuards(AuthGuard)
    async updatePlace(
        @Param() {id}: ParamsWithId,
        @Body() placeData: UpdatePlaceDto
    ) {
        return this.placesService.update(id, placeData);
    }

    @Delete(":id")
    @HasPermission("places")
    @UseGuards(AuthGuard)
    async deletePlace(@Param() {id}: ParamsWithId): Promise<boolean> {
        const result = this.placesService.deleteOne(id);

        if (result) {
            return result;
        }

        throw new HttpException("Place not found", HttpStatus.NOT_FOUND);
    }
}
