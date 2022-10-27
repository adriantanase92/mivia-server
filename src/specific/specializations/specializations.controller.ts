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
import {CreateSpecializationDto} from "./dto/create-specialization.dto";
import {UpdateSpecializationDto} from "./dto/update-specialization.dto";
import {Specialization} from "./schemas/specialization.schema";
import {SpecializationsService} from "./specializations.service";

@UseInterceptors(MongooseClassSerializerInterceptor(Specialization))
@Controller("specializations")
export class SpecializationsController {
    constructor(private specializationsService: SpecializationsService) {}

    @Post()
    @HasPermission("specializations")
    @UseGuards(AuthGuard)
    async createSpecialization(
        @Body() specialization: CreateSpecializationDto
    ): Promise<Specialization> {
        return await this.specializationsService.createOne(specialization);
    }

    @Get()
    async getAllSpecialization(): Promise<Specialization[]> {
        return this.specializationsService.find();
    }

    @Get(":id")
    async getSpecializationById(
        @Param() {id}: ParamsWithId
    ): Promise<Specialization> {
        const specialization = await this.specializationsService.findById(id);

        if (!specialization) {
            throw new NotFoundException();
        }

        return specialization;
    }

    @Patch(":id")
    @HasPermission("specializations")
    @UseGuards(AuthGuard)
    async updateSpecialization(
        @Param() {id}: ParamsWithId,
        @Body() specializationData: UpdateSpecializationDto
    ) {
        return this.specializationsService.update(id, specializationData);
    }

    @Delete(":id")
    @HasPermission("specializations")
    @UseGuards(AuthGuard)
    async deleteSpecialization(@Param() {id}: ParamsWithId): Promise<boolean> {
        const result = this.specializationsService.deleteOne(id);

        if (result) {
            return result;
        }

        throw new HttpException(
            "Specialization not found",
            HttpStatus.NOT_FOUND
        );
    }
}
