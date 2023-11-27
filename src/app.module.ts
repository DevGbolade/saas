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
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(8094).required(),
        DATABASE_URL: Joi.string().required(),
        SECRETKEY: Joi.string().required(),
        EXPIRESIN: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
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
