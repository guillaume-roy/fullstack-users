import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: process.env.NODE_ENV === 'production',
  }));
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
