import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';
import { OrderModule } from './order/order.module';
import { BusinessModule } from './business/business.module';
import { DepartmentHeadModule } from './department-head/department-head.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    BusinessModule,
    OrderModule,
    DepartmentHeadModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [PrismaModule],
})
export class AppModule {}
