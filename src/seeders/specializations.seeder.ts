import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Seeder} from "nestjs-seeder";
import {Specialization} from "src/specific/specializations/schemas/specialization.schema";

@Injectable()
export class SpecializationsSeeder implements Seeder {
    constructor(
        @InjectModel(Specialization.name)
        private readonly specialization: Model<Specialization>
    ) {}

    async seed(): Promise<Specialization[]> {
        const specializations = [
            {name: "Allergology and clinical immunology"},
            {name: "Anesthesia and intensive care"},
            {name: "Infectious diseases"},
            {name: "Cardiology"},
            {name: "Pediatric cardiology"},
            {name: "Cardiovascular surgery"},
            {name: "Endocrine surgery"},
            {name: "General surgery"},
            {name: "Oncological surgery"},
            {name: "Oral and maxillofacial surgery"},
            {name: "Plastic surgery"},
            {name: "Robotic surgery"},
            {name: "Thoracic surgery"},
            {name: "Vascular surgery"},
            {name: "Pediatric surgery and orthopedics"},
            {name: "Dermatology"},
            {name: "Diabetes, nutrition and metabolic diseases"},
            {name: "Endocrinology"},
            {name: "Epidemiology"},
            {name: "Gastroenterology"},
            {name: "Pediatric gastroenterology"},
            {name: "Hematology"},
            {name: "Labor medicine"},
            {name: "Family medicine"},
            {name: "Emergency medicine"},
            {name: "Physical medicine and rehabilitation"},
            {name: "General medicine"},
            {name: "Internal medicine"},
            {name: "Nephrology"},
            {name: "Neonatology"},
            {name: "Neurosurgery"},
            {name: "Neurology"},
            {name: "Pediatric neurology"},
            {name: "ENT and cervico-facial surgery"},
            {name: "Obstetrics and gynecology"},
            {name: "Ophthalmology"},
            {name: "Medical oncology"},
            {name: "Orthopedics and traumatology"},
            {name: "Pediatrics and pediatric specialties"},
            {name: "Pulmonology"},
            {name: "Pediatric pulmonology"},
            {name: "Psychiatry"},
            {name: "Pediatric psychiatry"},
            {name: "Psychology"},
            {name: "Radiology and medical imaging"},
            {name: "Radiotherapy"},
            {name: "Rheumatology"},
            {name: "Urologists"}
        ];
        return this.specialization.insertMany(specializations, {ordered: true});
    }

    async drop(): Promise<{deletedCount: number}> {
        return this.specialization.deleteMany({});
    }
}
