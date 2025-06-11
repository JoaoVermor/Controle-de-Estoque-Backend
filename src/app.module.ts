import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipmentModule } from './equipment/equipment.module';
import { PrismaClient} from '../prisma/app/generated/prisma/client';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EquipmentModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
