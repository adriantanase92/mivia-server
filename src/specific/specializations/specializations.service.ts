import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {CreateSpecializationDto} from "./dto/create-specialization.dto";
import {UpdateSpecializationDto} from "./dto/update-specialization.dto";
import {
    Specialization,
    SpecializationDocument
} from "./schemas/specialization.schema";

@Injectable()
export class SpecializationsService {
    constructor(
        @InjectModel(Specialization.name)
        private readonly specializationModel: Model<SpecializationDocument>
    ) {}

    async createOne(
        createSpecializationData: CreateSpecializationDto
    ): Promise<Specialization> {
        const specialization = await new this.specializationModel(
            createSpecializationData
        ).save();
        return specialization;
    }

    async find(
        entityFilterQuery: FilterQuery<Specialization> = {}
    ): Promise<Specialization[] | null> {
        return this.specializationModel.find(entityFilterQuery);
    }

    async findById(id: string): Promise<Specialization> {
        const existingSpecialization = await this.specializationModel.findById(
            id
        );
        if (!existingSpecialization) {
            throw new NotFoundException();
        }
        return existingSpecialization;
    }

    async update(id: string, data: UpdateSpecializationDto) {
        const existingSpecialization =
            await this.specializationModel.findByIdAndUpdate({_id: id}, data, {
                new: true
            });

        if (!existingSpecialization) {
            throw new NotFoundException(`Specialization #${id} not found`);
        }

        return existingSpecialization;
    }

    async deleteOne(id: string): Promise<boolean> {
        const deleteResult = await this.specializationModel.deleteOne({
            _id: id
        });
        return deleteResult.deletedCount >= 1;
    }
}
