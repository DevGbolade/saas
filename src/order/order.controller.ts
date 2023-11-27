import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
@ApiTags('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Creates an order' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Gets all order' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id/details')
  @ApiOperation({ summary: 'Gets a order' })
  getOrderDetails(@Param('id') id: string) {
    return this.orderService.getOrderDetails(id);
  }
}
