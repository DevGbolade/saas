//src/prisma-client-exception.filter.ts

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    this.handlePrismaError(exception, response, message, host);
  }

  private sendErrorResponse(response: any, status: number, message: string) {
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
  private handlePrismaError(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
    message: string,
    host: ArgumentsHost,
  ) {
    switch (exception.code) {
      case 'P2000':
        this.sendErrorResponse(response, HttpStatus.BAD_REQUEST, message);
        break;
      case 'P2001':
        this.sendErrorResponse(response, HttpStatus.BAD_REQUEST, message);
        break;
      case 'P2002':
        this.sendErrorResponse(response, HttpStatus.CONFLICT, message);
        break;
      case 'P2003':
        this.handleForeignKeyConstraintError(response, exception);
        break;
      case 'P2004':
        this.sendErrorResponse(
          response,
          HttpStatus.CONFLICT,
          `A constraint failed on the database: ${exception.meta?.constraint}`,
        );
        break;
      case 'P2005':
        this.sendErrorResponse(
          response,
          HttpStatus.BAD_REQUEST,
          `The value ${exception.meta?.field_value} stored in the database for the field ${exception.meta?.field_name} is invalid for the field's type`,
        );
        break;
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
  private handleForeignKeyConstraintError(
    response: Response,
    exception: Prisma.PrismaClientKnownRequestError,
  ) {
    const status = HttpStatus.CONFLICT;
    response.status(status).json({
      statusCode: status,
      message: `Foreign key constraint failed on the field: ${exception.meta?.field_name}`,
    });
  }
}
