import { Module } from '@nestjs/common';
import { DepartmentHeadService } from './department-head.service';
import { DepartmentHeadController } from './department-head.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentHeadController],
  providers: [DepartmentHeadService],
})
export class DepartmentHeadModule {}
