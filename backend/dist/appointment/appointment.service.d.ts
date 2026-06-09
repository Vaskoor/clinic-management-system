import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
export declare class AppointmentService {
    private appointmentRepository;
    constructor(appointmentRepository: Repository<Appointment>);
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    create(appointmentData: Partial<Appointment>): Promise<Appointment>;
    update(id: number, appointmentData: Partial<Appointment>): Promise<Appointment>;
    remove(id: number): Promise<void>;
}
