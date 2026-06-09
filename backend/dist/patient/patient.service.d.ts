import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
export declare class PatientService {
    private patientRepository;
    constructor(patientRepository: Repository<Patient>);
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    create(patientData: Partial<Patient>): Promise<Patient>;
    update(id: number, patientData: Partial<Patient>): Promise<Patient>;
    remove(id: number): Promise<void>;
}
