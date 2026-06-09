import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private inventoryRepository: Repository<InventoryItem>,
  ) {}

  findAll(): Promise<InventoryItem[]> {
    return this.inventoryRepository.find();
  }

  findOne(id: number): Promise<InventoryItem> {
    return this.inventoryRepository.findOne({ where: { id } });
  }

  create(itemData: Partial<InventoryItem>): Promise<InventoryItem> {
    const item = this.inventoryRepository.create(itemData);
    return this.inventoryRepository.save(item);
  }

  async update(id: number, itemData: Partial<InventoryItem>): Promise<InventoryItem> {
    await this.inventoryRepository.update(id, itemData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
}
