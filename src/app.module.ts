import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from '@nestjs/graphql'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {UserModule} from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './configs/db/mySql';
// import {DataSource} from 'typeorm'
// import {addTransactionalDataSource} from 'typeorm-transactional'

@Module({
  imports: [
    // Config TypeORM connect db
      TypeOrmModule.forRoot(dbConfig),
    // Init the grapthQL module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql']
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
