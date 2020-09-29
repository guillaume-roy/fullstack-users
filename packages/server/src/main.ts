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

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: initLogger(),
  });
  app.use(require('express-status-monitor')());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: isProduction,
    }),
  );
  app.use(requestIp.mw());

  if (isProduction) {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
    app.set('trust proxy', 1);
  }
  app.use(morgan(process.env.LOG_FORMAT));
  app.use(helmet());

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.QUEUE_URL],
      queue: process.env.QUEUE_NAME,
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservicesAsync();

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
