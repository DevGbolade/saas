import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // this.prismaService.user.aggregate
    return this.prismaService.user.create({
      data,
    });
  }
}
