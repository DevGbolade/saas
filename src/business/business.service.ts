import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/business.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(ownerId: string, createBusinessDto: CreateBusinessDto) {
    const { name, departmentHeads, orders } = createBusinessDto;

    const business = await this.prismaService.business.create({
      data: {
        name,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        departmentHeads: {
          connect: departmentHeads?.map((headId) => ({ id: headId })) ?? [],
        },
        orders: {
          connect: orders?.map((orderId) => ({ id: orderId })) ?? [],
        },
      },
    });
    return business;
  }
  async getBusinessOrders(id: string) {
    return this.prismaService.business.findUnique({ where: { id } }).orders();
  }

  async getCreditScore(id: string) {
    const business = await this.prismaService.business.findUnique({
      where: { id },
    });
    const transactions = await this.prismaService.transaction.findMany({
      where: { businessId: business.id },
    });

    if (transactions.length === 0) {
      // Return a default score or handle this case according to your business logic
      return 0;
    }

    const totalAmount = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
    const numberOfTransactions = transactions.length;

    // Calculate the credit score using the given formula
    const creditScore = totalAmount / (numberOfTransactions * 100);

    return { creditScore };
  }
}
