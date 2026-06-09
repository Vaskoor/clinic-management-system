import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    findAll(): Promise<Doctor[]>;
    findOne(id: string): Promise<Doctor>;
    create(doctorData: Partial<Doctor>): Promise<Doctor>;
    update(id: string, doctorData: Partial<Doctor>): Promise<Doctor>;
    remove(id: string): Promise<void>;
}
