import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('patient')
@UseGuards(AuthGuard('jwt'))
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findOne(+id);
  }

  @Post()
  create(@Body() patientData: Partial<Patient>): Promise<Patient> {
    return this.patientService.create(patientData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() patientData: Partial<Patient>): Promise<Patient> {
    return this.patientService.update(+id, patientData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientService.remove(+id);
  }
}
