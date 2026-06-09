import { InventoryService } from './inventory.service';
import { InventoryItem } from './inventory.entity';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAll(): Promise<InventoryItem[]>;
    findOne(id: string): Promise<InventoryItem>;
    create(itemData: Partial<InventoryItem>): Promise<InventoryItem>;
    update(id: string, itemData: Partial<InventoryItem>): Promise<InventoryItem>;
    remove(id: string): Promise<void>;
}
