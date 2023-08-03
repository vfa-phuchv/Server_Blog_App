import {TypeOrmModuleOptions} from  '@nestjs/typeorm'
// import {DataSource, DataSourceOptions} from 'typeorm'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { UserEntity } from 'src/entities/user.entity'
dotenv.config()

const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    port: Number(process.env.RDS_PORT) || 3306,
    host: process.env.RDS_HOST,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    // logger: 'debug',
    // charset: 'utf8mb4',
    synchronize: true,
    entities: [path.join(__dirname, '../..', '/entities/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '../..', '/migration/*{.ts,.js}')],
    // autoLoadEntities: true,
}

export default dbConfig;