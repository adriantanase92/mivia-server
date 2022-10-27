import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {CreatePlaceDto} from "./dto/create-place.dto";
import {UpdatePlaceDto} from "./dto/update-place.dto";
import {Place, PlaceDocument} from "./schemas/place.schema";

@Injectable()
export class PlacesService {
    constructor(
        @InjectModel(Place.name)
        private readonly placesModel: Model<PlaceDocument>
    ) {}

    async createOne(createPlaceData: CreatePlaceDto): Promise<Place> {
        const place = await new this.placesModel(createPlaceData).save();
        return place;
    }

    async find(
        entityFilterQuery: FilterQuery<Place> = {}
    ): Promise<Place[] | null> {
        return this.placesModel.find(entityFilterQuery);
    }

    async findById(id: string): Promise<Place> {
        const existingPlace = await this.placesModel.findById(id);
        if (!existingPlace) {
            throw new NotFoundException();
        }
        return existingPlace;
    }

    async update(id: string, data: UpdatePlaceDto) {
        const existingPlace = await this.placesModel.findByIdAndUpdate(
            {_id: id},
            data,
            {
                new: true
            }
        );

        if (!existingPlace) {
            throw new NotFoundException(`Place #${id} not found`);
        }

        return existingPlace;
    }

    async deleteOne(id: string): Promise<boolean> {
        const deleteResult = await this.placesModel.deleteOne({
            _id: id
        });
        return deleteResult.deletedCount >= 1;
    }
}
