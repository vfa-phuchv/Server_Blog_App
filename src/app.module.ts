import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from '@nestjs/graphql'
import {UserModule} from './modules/user/user.module'
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './configs/db/mySql';
import graphQLconfig from './configs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot(graphQLconfig),
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
