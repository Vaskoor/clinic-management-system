import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    findAll(): Promise<Patient[]>;
    findOne(id: string): Promise<Patient>;
    create(patientData: Partial<Patient>): Promise<Patient>;
    update(id: string, patientData: Partial<Patient>): Promise<Patient>;
    remove(id: string): Promise<void>;
}
