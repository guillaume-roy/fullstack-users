import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(require('express-status-monitor')());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: isProduction,
    }),
  );
  app.use(helmet());
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

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
