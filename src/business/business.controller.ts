import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/business.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Order } from 'src/order/entities/order.entity';
import { CreateOrderDeptHeadDto } from 'src/order/dto/create-order.dto';

@ApiTags('businesses')
@Controller('businesses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('register')
  @ApiOperation({ summary: 'Creates a business' })
  @ApiOkResponse({ type: CreateBusinessDto })
  async create(
    @CurrentUser() { id }: { id: string },
    @Body() createBusinessDto: CreateBusinessDto,
  ) {
    return await this.businessService.create(id, createBusinessDto);
  }

  @Get(':businessId/orders')
  @ApiOperation({ summary: 'Gets business orders' })
  getBusinessOrders(@Param('businessId') id: string) {
    return this.businessService.getBusinessOrders(id);
  }

  @ApiOperation({ summary: 'Gets business credit score' })
  @Get(':businessId/credit-score')
  getCreditScore(@Param('businessId') id: string) {
    return this.businessService.getCreditScore(id);
  }

  @Post(':businessId/department-head/:departmentHeadId/order')
  @ApiOperation({ summary: 'Create Order by Department Head' })
  @ApiOkResponse({ type: Order }) // Assuming Order is the type for the response
  async createOrderByDeptHead(
    @Param('businessId') businessId: string,
    @Param('departmentHeadId') departmentHeadId: string,
    @Body() createOrderDto: CreateOrderDeptHeadDto,
  ) {
    return await this.businessService.createOrderByDeptHead({
      businessId,
      departmentHeadId,
      createOrderDto,
    });
  }

  @ApiOperation({ summary: 'Gets business order statistics' })
  @Get(':businessId/orders/metrics')
  getOrderMetrics(@Param('businessId') id: string) {
    return this.businessService.getOrderMetrics(id);
  }
}
