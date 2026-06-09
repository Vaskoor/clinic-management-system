import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentService.findOne(+id);
  }

  @Post()
  create(@Body() appointmentData: Partial<Appointment>): Promise<Appointment> {
    return this.appointmentService.create(appointmentData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() appointmentData: Partial<Appointment>): Promise<Appointment> {
    return this.appointmentService.update(+id, appointmentData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentService.remove(+id);
  }
}
