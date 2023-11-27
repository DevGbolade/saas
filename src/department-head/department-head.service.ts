import { Injectable } from '@nestjs/common';
import { CreateDepartmentHeadDto } from './dto/create-department-head.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DepartmentHeadService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDepartmentHeadDto: CreateDepartmentHeadDto) {
    return this.prismaService.departmentHead.create({
      data: createDepartmentHeadDto,
    });
  }

  findAll() {
    return this.prismaService.departmentHead.findMany();
  }

  findOne(id: string) {
    return this.prismaService.departmentHead.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} departmentHead`;
  }
}
