import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { InventoryModule } from './inventory/inventory.module';
import { PharmacistModule } from './pharmacist/pharmacist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    PatientModule,
    DoctorModule,
    AppointmentModule,
    InventoryModule,
    PharmacistModule,
  ],
})
export class AppModule {}
