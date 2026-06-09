import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  doctorId: number;

  @Column()
  date: string;  // ISO date string

  @Column({ default: 'scheduled' }) // scheduled, completed, cancelled
  status: string;
}
