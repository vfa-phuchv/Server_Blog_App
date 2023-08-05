import { Module } from '@nestjs/common';
import {UserModule} from '../user/user.module'
import {AuthService} from './auth.service'
import {AuthResolver} from './auth.resolve'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
//* import strategy passport
import {JwtStrategy} from './strategies/jwt-strategy'
import * as dotenv from 'dotenv'
dotenv.config()

@Module({ 
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
    global: true,
    secret: process.env.JWT_ACCESS_KEY,
    signOptions: {expiresIn: parseInt(process.env.JWT_EXPIRE_TIME, 10)}
  })
],
  providers: [AuthResolver, AuthService, JwtStrategy]
})
export class AuthModule {} 
