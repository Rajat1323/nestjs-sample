import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { CustomLogger } from './shared/filters/logger';
import { DataSource } from 'typeorm';
import { pgDBConfig } from './configs';
import * as bodyParser from 'body-parser';

const envs = require('dotenv').config();

export async function initializeSwagger(app: INestApplication<any>) {
  if (!process.env.APP_NAME || !process.env.APP_DESC || !process.env.APP_ENDPOINT) {
    throw new Error('Required environment variables are missing.');
  }

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_DESC)
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addServer(process.env.APP_ENDPOINT || '/')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.components = {
    ...document.components,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  };

  document.security = [{ bearerAuth: [] }];

    SwaggerModule.setup('doc', app, document, {
      swaggerOptions: {
        authAction: {
          bearerAuth: {
            name: "bearerAuth",
            schema: {
              type: 'http',
              in: 'header',
              name: 'Authorization',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          }
        }
      }
    });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,PATCH',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });
  
  const port = process.env.PORT;
  app.useGlobalFilters(new GlobalExceptionFilter(new CustomLogger()));
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to DTO instances
    whitelist: true, // Strip properties that do not have decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are found
  }));


  // Then run migrations

  Logger.log('Migrations executed.');

  await initializeSwagger(app);
  
  await app.listen(port);
  Logger.log(`Server is running on: http://localhost:${port}`);
}

bootstrap();
