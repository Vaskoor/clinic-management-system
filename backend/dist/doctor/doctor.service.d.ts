import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
export declare class DoctorService {
    private doctorRepository;
    constructor(doctorRepository: Repository<Doctor>);
    findAll(): Promise<Doctor[]>;
    findOne(id: number): Promise<Doctor>;
    create(doctorData: Partial<Doctor>): Promise<Doctor>;
    update(id: number, doctorData: Partial<Doctor>): Promise<Doctor>;
    remove(id: number): Promise<void>;
}
