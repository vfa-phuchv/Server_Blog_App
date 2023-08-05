import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {initializeTransactionalContext} from 'typeorm-transactional'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //* Initialize cls-hooked
  initializeTransactionalContext

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();