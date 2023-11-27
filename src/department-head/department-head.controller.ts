import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DepartmentHeadService } from './department-head.service';
import { CreateDepartmentHeadDto } from './dto/create-department-head.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('department-head')
@ApiTags('department-head')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DepartmentHeadController {
  constructor(private readonly departmentHeadService: DepartmentHeadService) {}

  @Post()
  create(@Body() createDepartmentHeadDto: CreateDepartmentHeadDto) {
    return this.departmentHeadService.create(createDepartmentHeadDto);
  }

  @Get()
  findAll() {
    return this.departmentHeadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentHeadService.findOne(id);
  }
}
