import cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { swaggerHtml } from './swagger.static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Shop Verse API')
    .setDescription('The Shop Verse API description')
    .setVersion('1.0')
    .addTag('Shop Verse')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  // Create a simple HTML response for Swagger UI to avoid static file issues
  app.use('/api/docs', (req: Request, res: Response) => {
    res.send(swaggerHtml);
  });

  // Serve the OpenAPI JSON
  app.use('/api/docs-json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
