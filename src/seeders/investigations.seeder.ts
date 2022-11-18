import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Seeder} from "nestjs-seeder";
import {Investigation} from "src/specific/investigations/schemas/investigation.schema";
import {faker} from "@faker-js/faker";

@Injectable()
export class InvestigationsSeeder implements Seeder {
    constructor(
        @InjectModel(Investigation.name)
        private readonly investigation: Model<Investigation>
    ) {}

    async seed(): Promise<Investigation[]> {
        const investigations = [
            {name: "Consultation", price: faker.commerce.price(50, 150)},
            {name: "Cardiac ablation", price: faker.commerce.price(50, 350)},
            {name: "Biopsy", price: faker.commerce.price(50, 350)},
            {name: "Bronchoscopy", price: faker.commerce.price(50, 350)},
            {name: "Curettage", price: faker.commerce.price(50, 350)},
            {name: "Circumcision", price: faker.commerce.price(50, 350)},
            {name: "Colonoscopy", price: faker.commerce.price(50, 350)},
            {name: "CBC", price: faker.commerce.price(50, 350)},
            {name: "Physical Therapy", price: faker.commerce.price(50, 350)},
            {name: "Liposuction", price: faker.commerce.price(50, 350)},
            {name: "Rhinoplasty", price: faker.commerce.price(50, 350)},
            {name: "Spirometry", price: faker.commerce.price(50, 350)},
            {name: "Vasectomy", price: faker.commerce.price(50, 350)}
        ];
        return this.investigation.insertMany(investigations, {ordered: true});
    }

    async drop(): Promise<{deletedCount: number}> {
        return this.investigation.deleteMany({});
    }
}
