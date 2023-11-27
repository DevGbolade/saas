import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import {
  CreateBusinessDto,
  CreateOrderByDeptHeadDto,
} from './dto/business.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@ApiTags('businesses')
@Controller('businesses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a business' })
  @ApiOkResponse({ type: CreateBusinessDto })
  async create(
    @CurrentUser() { id }: { id: string },
    @Body() createBusinessDto: CreateBusinessDto,
  ) {
    return await this.businessService.create(id, createBusinessDto);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Gets business orders' })
  getBusinessOrders(@Param('id') id: string) {
    return this.businessService.getBusinessOrders(id);
  }

  @ApiOperation({ summary: 'Gets business credit score' })
  @Get(':id/credit-score')
  getCreditScore(@Param('id') id: string) {
    return this.businessService.getCreditScore(id);
  }

  @Post('/create-order-by-dept-head')
  @ApiOperation({ summary: 'creates order By Department head' })
  @ApiOkResponse({ type: CreateOrderByDeptHeadDto })
  async createOrderByDeptHead(
    @Body()
    { businessId, departmentHeadId, createOrderDto }: CreateOrderByDeptHeadDto,
  ) {
    return await this.businessService.createOrderByDeptHead({
      businessId,
      departmentHeadId,
      createOrderDto,
    });
  }

  @ApiOperation({ summary: 'Gets business order statistics' })
  @Get(':id/order-metric')
  getOrderMetrics(@Param('id') id: string) {
    return this.businessService.getOrderMetrics(id);
  }
}
