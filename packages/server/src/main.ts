import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import * as requestIp from 'request-ip';
import { initLogger } from './config/log';
import * as morgan from 'morgan';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';

  // Init App with logger
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: initLogger(),
    cors: {
      origin: ['http://localhost:4200'],
    },
  });

  // Enable monitoring
  // http://localhost:3000/status
  app.use(require('express-status-monitor')());

  // Enable DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: isProduction,
    }),
  );

  // Get client IP
  app.use(requestIp.mw());

  // Security rate limit
  if (isProduction) {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );

    // Enable this to get client IP when app is behind a reverse proxy
    app.set('trust proxy', 1);
  }

  // Security
  app.use(helmet());

  // Logging HTTP requests
  app.use(morgan(process.env.LOG_FORMAT));

  // Connect to RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.QUEUE_URL],
      queue: process.env.QUEUE_NAME,
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservicesAsync();

  // Generate Swagger (OpenAPI)
  const options = new DocumentBuilder()
    .setTitle('Fullstack-Users')
    .setDescription('Fullstack-Users API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
