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
import {CreateInvestigationDto} from "./dto/create-investigation.dto";
import {UpdateInvestigationDto} from "./dto/update-investigation.dto";
import {InvestigationsService} from "./investigations.service";
import {Investigation} from "./schemas/investigation.schema";

@UseInterceptors(MongooseClassSerializerInterceptor(Investigation))
@Controller("investigations")
export class InvestigationsController {
    constructor(private investigationsService: InvestigationsService) {}

    @Post()
    @HasPermission("investigations")
    @UseGuards(AuthGuard)
    async createInvestigation(
        @Body() investigation: CreateInvestigationDto
    ): Promise<Investigation> {
        return await this.investigationsService.createOne(investigation);
    }

    @Get()
    async getAllInvestigations(): Promise<Investigation[]> {
        return this.investigationsService.find();
    }

    @Get(":id")
    async getInvestigationById(
        @Param() {id}: ParamsWithId
    ): Promise<Investigation> {
        const investigation = await this.investigationsService.findById(id);

        if (!investigation) {
            throw new NotFoundException();
        }

        return investigation;
    }

    @Patch(":id")
    @HasPermission("investigations")
    @UseGuards(AuthGuard)
    async updateInvestigation(
        @Param() {id}: ParamsWithId,
        @Body() investigationData: UpdateInvestigationDto
    ) {
        return this.investigationsService.update(id, investigationData);
    }

    @Delete(":id")
    @HasPermission("investigations")
    @UseGuards(AuthGuard)
    async deleteInvestigation(@Param() {id}: ParamsWithId): Promise<boolean> {
        const result = this.investigationsService.deleteOne(id);

        if (result) {
            return result;
        }

        throw new HttpException(
            "Investigations not found",
            HttpStatus.NOT_FOUND
        );
    }
}
