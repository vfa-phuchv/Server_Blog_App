import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {initializeTransactionalContext} from 'typeorm-transactional'
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  //* Initialize cls-hooked
  initializeTransactionalContext
  const app = await NestFactory.create(AppModule, {cors: true});
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }) 

  app.use(bodyParser.json({limit: '10mb'}))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();