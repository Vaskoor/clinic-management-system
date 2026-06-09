import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(appointmentData);
    return this.appointmentRepository.save(appointment);
  }

  async update(id: number, appointmentData: Partial<Appointment>): Promise<Appointment> {
    await this.appointmentRepository.update(id, appointmentData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
