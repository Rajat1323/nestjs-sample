import { Logger as NestLogger } from '@nestjs/common';
import * as winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
  ),
);

const fileTransport = new winston.transports.File({ filename: 'logs/app.log' });

export class CustomLogger extends NestLogger {
  private logger: winston.Logger;

  constructor() {
    super();

    this.logger = winston.createLogger({
      format: logFormat,
      transports: [fileTransport],
    });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
    super.error(message, trace, context);
  }
}
