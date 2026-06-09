import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { Pharmacist } from './pharmacist.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('pharmacist')
@UseGuards(AuthGuard('jwt'))
export class PharmacistController {
  constructor(private readonly pharmacistService: PharmacistService) {}

  @Get()
  findAll(): Promise<Pharmacist[]> {
    return this.pharmacistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pharmacist> {
    return this.pharmacistService.findOne(+id);
  }

  @Post()
  create(@Body() pharmacistData: Partial<Pharmacist>): Promise<Pharmacist> {
    return this.pharmacistService.create(pharmacistData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pharmacistData: Partial<Pharmacist>): Promise<Pharmacist> {
    return this.pharmacistService.update(+id, pharmacistData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.pharmacistService.remove(+id);
  }
}
