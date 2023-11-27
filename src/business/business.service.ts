import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBusinessDto,
  CreateOrderByDeptHeadDto,
} from './dto/business.dto';
import { PrismaService } from 'src/prisma.service';
import { startOfDay, endOfDay } from 'date-fns';
import axios from 'axios';

import { Order } from '@prisma/client';
import { platform_code } from 'src/shared/utils';

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
    const orders = await this.prismaService.business
      .findUnique({ where: { id } })
      .orders();
    if (!orders) {
      throw new NotFoundException(`No orders found for this businessId: ${id}`);
    }
    return orders;
  }

  async getCreditScore(id: string) {
    const businessOrders = await this.getBusinessOrders(id);
    if (!businessOrders) {
      throw new NotFoundException(`No data found for this businessId: ${id}`);
    }

    if (businessOrders.length === 0) {
      // Return a default score or handle this case according to your business logic
      return 0;
    }

    const totalAmount = businessOrders.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
    const numberOfbusiness = businessOrders.length;

    // Calculate the credit score using the given formula
    const creditScore = totalAmount / (numberOfbusiness * 100);

    return { creditScore };
  }

  /**
   * Create an order for a department head.
   * @param {CreateOrderByDeptHeadDto} params - Parameters for creating an order.
   * @param {string} params.businessId - The ID of the business.
   * @param {string} params.departmentHeadId - The ID of the department head.
   * @param {CreateOrderDeptHeadDto} params.createOrderDto - The DTO containing order details.
   * @returns {Promise<Order>} - A Promise that resolves to the created order.
   */
  async createOrderByDeptHead({
    businessId,
    departmentHeadId,
    createOrderDto,
  }: CreateOrderByDeptHeadDto): Promise<Order> {
    try {
      // Create the order in the database
      const order = await this.prismaService.order.create({
        data: {
          ...createOrderDto,
          businessId,
          departmentHeadId,
        },
      });

      if (order) {
        // Prepare payload for logging to MongoDB
        const mongoPayload = {
          businessID: order.businessId,
          amount: order.amount,
          date: order.createdAt,
          status: order.status,
        };

        // Make an asynchronous API call to log to MongoDB
        const mongoApiCallPromise = axios.post(
          'https://duplo-next.vercel.app/api/transactions',
          mongoPayload,
        );

        // Prepare payload for logging to the government taxes API
        const taxesPayload = {
          order_id: order.id, // Assuming you have an 'id' field in your Order model
          platform_code, // Replace with the actual platform code
          order_amount: order.amount,
        };

        // Make an asynchronous API call to the government taxes API with a timeout of 30 seconds
        const taxesApiCallPromise = axios.post(
          'https://duplo-next.vercel.app/api/government-taxes',
          taxesPayload,
          { timeout: 30000 }, // 30 seconds timeout
        );

        // Handle both API calls asynchronously
        const [mongoApiResponse, taxesApiResponse] = await Promise.all([
          mongoApiCallPromise,
          taxesApiCallPromise,
        ]);

        // Process the responses as needed
        console.log('MongoDB API response:', mongoApiResponse.data);
        console.log('Government Taxes API response:', taxesApiResponse.data);

        // Continue with any other logic related to the order creation

        return order;
      }
    } catch (error) {
      // Handle errors, log, or retry if needed
      console.error('Error creating order:', error.message);
    }
  }

  async getOrderMetrics(id: string) {
    // Implement logic to retrieve various order-related metrics
    const businessOrders = await this.getBusinessOrders(id);
    if (!businessOrders) {
      throw new NotFoundException(`No data found for this businessId: ${id}`);
    }
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    // Filter orders for today
    const ordersForToday = businessOrders.filter(
      (order) =>
        order.createdAt >= startOfToday && order.createdAt <= endOfToday,
    );
    const totalOrdersAmountForToday = ordersForToday.reduce(
      (acc, { amount }) => acc + amount,
      0,
    );
    const totalOrdersAmount = businessOrders.reduce(
      (acc, { amount }) => acc + amount,
      0,
    );
    return {
      totalOrders: businessOrders.length,
      totalOrderForToday: ordersForToday.length,
      totalOrdersAmountForToday,
      totalOrdersAmount,
    };
  }
}
