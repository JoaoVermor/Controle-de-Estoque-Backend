import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment, EquipmentType } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  async create(@Body() equipment: {
    name: string;
    code: string;
    quantity: number;
    type: EquipmentType;
    location: string;
    department: string;
    isOperational?: boolean;
    notes?: string;
    validity?: Date;
  }): Promise<Equipment> {
    return this.equipmentService.create(equipment);
  }

  @Get()
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string,
    @Query('types') types?: string,
    @Query('department') department?: string,
    @Query('isOperational') isOperational?: string,
  ): Promise<Equipment[]> {
    // Parse types from comma-separated string to array
    const typesArray = types ? types.split(',').map(t => t.trim() as EquipmentType) : undefined;

    // Parse isOperational from string to boolean
    const isOperationalBool = isOperational !== undefined ? isOperational === 'true' : undefined;

    return this.equipmentService.findAll({
      skip,
      take,
      search,
      types: typesArray,
      department,
      isOperational: isOperationalBool
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Equipment> {
    return this.equipmentService.findOne(id);
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string): Promise<Equipment> {
    return this.equipmentService.findByCode(code);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() equipment: {
      name?: string;
      code?: string;
      quantity?: number;
      type?: EquipmentType;
      location?: string;
      department?: string;
      isOperational?: boolean;
      notes?: string;
      validity?: Date;
    },
  ): Promise<Equipment> {
    return this.equipmentService.update(id, equipment);
  }

  @Delete(':id')    
  async remove(@Param('id') id: string): Promise<Equipment> {
    return this.equipmentService.remove(id);
  }

  @Put(':id/quantity')
  async updateQuantity(
    @Param('id') id: string,
    @Body() data: { quantity: number },
  ): Promise<Equipment> {
    return this.equipmentService.updateQuantity(id, data.quantity);
  }

  @Put(':id/status')
  async updateOperationalStatus(
    @Param('id') id: string,
    @Body() data: { isOperational: boolean },
  ): Promise<Equipment> {
    return this.equipmentService.updateOperationalStatus(id, data.isOperational);
  }
}
