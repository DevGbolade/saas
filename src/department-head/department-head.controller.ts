import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DepartmentHeadService } from './department-head.service';
import { CreateDepartmentHeadDto } from './dto/create-department-head.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('department-head')
@ApiTags('department-head')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DepartmentHeadController {
  constructor(private readonly departmentHeadService: DepartmentHeadService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a head of department' })
  create(@Body() createDepartmentHeadDto: CreateDepartmentHeadDto) {
    return this.departmentHeadService.create(createDepartmentHeadDto);
  }
  @ApiOperation({ summary: 'Gets all head of departments' })
  @Get()
  findAll() {
    return this.departmentHeadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gets a head of department' })
  findOne(@Param('id') id: string) {
    return this.departmentHeadService.findOne(id);
  }
}
