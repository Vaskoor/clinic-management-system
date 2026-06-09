import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pharmacist } from './pharmacist.entity';
import { PharmacistService } from './pharmacist.service';
import { PharmacistController } from './pharmacist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pharmacist])],
  providers: [PharmacistService],
  controllers: [PharmacistController],
})
export class PharmacistModule {}
