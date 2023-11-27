import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prismaService.order.create({ data: createOrderDto });
  }
  async getOrderDetails(id: string) {
    const order = await this.prismaService.order.findUnique({ where: { id } });
    return order;
  }

  findAll() {
    return this.prismaService.order.findMany();
  }
}
