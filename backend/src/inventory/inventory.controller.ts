import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './inventory.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(): Promise<InventoryItem[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InventoryItem> {
    return this.inventoryService.findOne(+id);
  }

  @Post()
  create(@Body() itemData: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.inventoryService.create(itemData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() itemData: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.inventoryService.update(+id, itemData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.inventoryService.remove(+id);
  }
}
