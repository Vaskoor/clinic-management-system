import { Repository } from 'typeorm';
import { InventoryItem } from './inventory.entity';
export declare class InventoryService {
    private inventoryRepository;
    constructor(inventoryRepository: Repository<InventoryItem>);
    findAll(): Promise<InventoryItem[]>;
    findOne(id: number): Promise<InventoryItem>;
    create(itemData: Partial<InventoryItem>): Promise<InventoryItem>;
    update(id: number, itemData: Partial<InventoryItem>): Promise<InventoryItem>;
    remove(id: number): Promise<void>;
}
