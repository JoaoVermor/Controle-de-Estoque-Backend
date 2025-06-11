import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Equipment, EquipmentType } from '../../prisma/app/generated/prisma/client';

@Injectable()
export class EquipmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: {
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
    return this.prisma.equipment.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    search?: string;
    types?: EquipmentType[];
    department?: string;
    isOperational?: boolean;
  }): Promise<Equipment[]> {
    const { skip, take, search, types, department, isOperational } = params;

    // Build the where clause dynamically
    const whereClause: any = {};

    // Add search functionality (search in name and code)
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Add types filter (multiple types)
    if (types && types.length > 0) {
      whereClause.type = { in: types };
    }

    // Add department filter
    if (department) {
      whereClause.department = department;
    }

    // Add operational status filter
    if (isOperational !== undefined) {
      whereClause.isOperational = isOperational;
    }

    return this.prisma.equipment.findMany({
      skip,
      take,
      where: whereClause,
      orderBy: { createdAt: 'desc' }, // Add default ordering
    });
  }

  async findOne(id: string): Promise<Equipment> {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new NotFoundException(`Equipamento com ID ${id} não encontrado`);
    }

    return equipment;
  }

  async findByCode(code: string): Promise<Equipment> {
    const equipment = await this.prisma.equipment.findUnique({
      where: { code },
    });

    if (!equipment) {
      throw new NotFoundException(`Equipamento com código ${code} não encontrado`);
    }

    return equipment;
  }

  async update(
    id: string,
    data: {
      name?: string;
      code?: string;
      quantity?: number;
      type?: EquipmentType;
      location?: string;
      department?: string;
      isOperational?: boolean;
      notes?: string;
      Validity?: Date;
    },
  ): Promise<Equipment> {
    return this.prisma.equipment.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Equipment> {
    return this.prisma.equipment.delete({
      where: { id },
    });
  }

  async updateQuantity(id: string, quantity: number): Promise<Equipment> {
    return this.prisma.equipment.update({
      where: { id },
      data: { quantity },
    });
  }

  async updateOperationalStatus(
    id: string,
    isOperational: boolean,
  ): Promise<Equipment> {
    return this.prisma.equipment.update({
      where: { id },
      data: { isOperational },
    });
  }
} 