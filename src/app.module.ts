import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';
import { OrderModule } from './order/order.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, BusinessModule, OrderModule],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
