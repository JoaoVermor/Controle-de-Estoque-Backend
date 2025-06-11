import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { PrismaClient } from '../../prisma/app/generated/prisma/client';


@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, PrismaClient],
  exports: [EquipmentService],
})
export class EquipmentModule {} 