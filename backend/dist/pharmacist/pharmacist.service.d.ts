import { Repository } from 'typeorm';
import { Pharmacist } from './pharmacist.entity';
export declare class PharmacistService {
    private pharmacistRepository;
    constructor(pharmacistRepository: Repository<Pharmacist>);
    findAll(): Promise<Pharmacist[]>;
    findOne(id: number): Promise<Pharmacist>;
    create(pharmacistData: Partial<Pharmacist>): Promise<Pharmacist>;
    update(id: number, pharmacistData: Partial<Pharmacist>): Promise<Pharmacist>;
    remove(id: number): Promise<void>;
}
