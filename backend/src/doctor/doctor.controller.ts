import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('doctor')
@UseGuards(AuthGuard('jwt'))
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findOne(+id);
  }

  @Post()
  create(@Body() doctorData: Partial<Doctor>): Promise<Doctor> {
    return this.doctorService.create(doctorData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() doctorData: Partial<Doctor>): Promise<Doctor> {
    return this.doctorService.update(+id, doctorData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doctorService.remove(+id);
  }
}
