import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {CreateInvestigationDto} from "./dto/create-investigation.dto";
import {UpdateInvestigationDto} from "./dto/update-investigation.dto";
import {
    Investigation,
    InvestigationDocument
} from "./schemas/investigation.schema";

@Injectable()
export class InvestigationsService {
    constructor(
        @InjectModel(Investigation.name)
        private readonly investigationModel: Model<InvestigationDocument>
    ) {}

    async createOne(
        createInvestigationData: CreateInvestigationDto
    ): Promise<Investigation> {
        const investigation = await new this.investigationModel(
            createInvestigationData
        ).save();
        return investigation;
    }

    async find(
        entityFilterQuery: FilterQuery<Investigation> = {}
    ): Promise<Investigation[] | null> {
        return this.investigationModel.find(entityFilterQuery);
    }

    async findById(id: string): Promise<Investigation> {
        const existingInvestigation = await this.investigationModel.findById(
            id
        );
        if (!existingInvestigation) {
            throw new NotFoundException();
        }
        return existingInvestigation;
    }

    async update(id: string, data: UpdateInvestigationDto) {
        const existingInvestigation =
            await this.investigationModel.findByIdAndUpdate({_id: id}, data, {
                new: true
            });

        if (!existingInvestigation) {
            throw new NotFoundException(`Investigation #${id} not found`);
        }

        return existingInvestigation;
    }

    async deleteOne(id: string): Promise<boolean> {
        const deleteResult = await this.investigationModel.deleteOne({_id: id});
        return deleteResult.deletedCount >= 1;
    }
}
