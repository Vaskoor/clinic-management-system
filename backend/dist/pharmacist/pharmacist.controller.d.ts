import { PharmacistService } from './pharmacist.service';
import { Pharmacist } from './pharmacist.entity';
export declare class PharmacistController {
    private readonly pharmacistService;
    constructor(pharmacistService: PharmacistService);
    findAll(): Promise<Pharmacist[]>;
    findOne(id: string): Promise<Pharmacist>;
    create(pharmacistData: Partial<Pharmacist>): Promise<Pharmacist>;
    update(id: string, pharmacistData: Partial<Pharmacist>): Promise<Pharmacist>;
    remove(id: string): Promise<void>;
}
