import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ApiResponseDto } from '../dto/api-response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);

    const status =
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
    }

    response.status(status).json(ApiResponseDto.error(message));
  }
}
