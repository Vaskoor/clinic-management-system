import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pharmacist } from './pharmacist.entity';

@Injectable()
export class PharmacistService {
  constructor(
    @InjectRepository(Pharmacist)
    private pharmacistRepository: Repository<Pharmacist>,
  ) {}

  findAll(): Promise<Pharmacist[]> {
    return this.pharmacistRepository.find();
  }

  findOne(id: number): Promise<Pharmacist> {
    return this.pharmacistRepository.findOne({ where: { id } });
  }

  create(pharmacistData: Partial<Pharmacist>): Promise<Pharmacist> {
    const pharmacist = this.pharmacistRepository.create(pharmacistData);
    return this.pharmacistRepository.save(pharmacist);
  }

  async update(id: number, pharmacistData: Partial<Pharmacist>): Promise<Pharmacist> {
    await this.pharmacistRepository.update(id, pharmacistData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pharmacistRepository.delete(id);
  }
}
