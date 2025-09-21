import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import { Response } from 'express';
import { ApiResponseDto } from '../dto/api-response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Something went wrong';

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as { message: unknown };
      if (errorResponse.message instanceof Array)
        message = errorResponse.message.join(', ');
      else if (typeof errorResponse.message === 'string')
        message = errorResponse.message;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          message = 'Duplicate record already exists';
          break;
        case 'P2003':
          message = `Failed reference constrains : ${(exception.meta as { constraint: string })?.constraint}`;
          break;
        case 'P2025':
          message = 'Record not found';
          break;
      }
    } else if (exception instanceof PrismaClientValidationError) {
      // Extract meaningful info
      const match = exception.message.match(/Argument `(.+?)` is missing/);
      if (match) {
        message = `Field "${match[1]}" is required`;
        status = HttpStatus.BAD_REQUEST;
      } else {
        message = exception.message;
        status = HttpStatus.BAD_REQUEST;
      }
    }

    console.log('Exception: ', exception);

    response.status(status).json(ApiResponseDto.error(message));
  }
}
