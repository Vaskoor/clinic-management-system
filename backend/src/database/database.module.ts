import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Patient } from '../patient/patient.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Appointment } from '../appointment/appointment.entity';
import { InventoryItem } from '../inventory/inventory.entity';
import { Pharmacist } from '../pharmacist/pharmacist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'clinic.db',
      entities: [User, Patient, Doctor, Appointment, InventoryItem, Pharmacist],
      synchronize: true,  // only for development
    }),
  ],
})
export class DatabaseModule {}
