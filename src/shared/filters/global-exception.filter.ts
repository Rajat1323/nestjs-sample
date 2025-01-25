import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { CustomLogger } from './logger';
import { TokenExpiredError } from '@nestjs/jwt';
import { IHttpResponse, STATIC_MESSAGES } from '../utils/utility.const';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  constructor(private readonly logger: CustomLogger) { }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message || STATIC_MESSAGES.INTERNAL_SERVER_ERROR
        : STATIC_MESSAGES.INTERNAL_SERVER_ERROR;

    // Define the response structure
    const errorResponse: IHttpResponse = {
      message
    };

    if (exception instanceof TokenExpiredError) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        ...errorResponse,
        message: STATIC_MESSAGES.UNAUTHORIZED,
      });
    } else {
      if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(`Unhandled exception: ${exception.stack}`, exception.stack, 'GlobalExceptionFilter');
      }

      response.status(statusCode).json(errorResponse);
    }
  }
}
