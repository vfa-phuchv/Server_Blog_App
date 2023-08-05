import * as bcrypt from 'bcrypt' 
import { Injectable, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {UserService} from '../user/user.service'
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService){}    

  async register(userData) {
    const {email, password, nickName, role} = userData;

    //* check email exists
    const emailExisting = await this.userService.findUserByEmail(email);
    if(emailExisting){
      throw new HttpException('Email alredy exists!', HttpStatus.CONFLICT);
    }

    //* hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //* new user
    const newUser = {
      email,
      password: hashPassword,
      nickName,
      role
    } 

    return this.userService.createUser(newUser);
  }
   
  async login(userDataInput) {
    const {email, password} = userDataInput;
    const user = await this.validateUser(email, password);
    const payload = {userId: user.userId, email: user.email};
    const auth = await this.createAuthToken(payload);
    return {auth, user};
  }

  //* method validate User with "email" & "password"  
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if(!user){
      throw new BadRequestException('Email is not registered!');
    }
    //* compare password
    const matchPassword = bcrypt.compareSync(password, user.password);
    if(matchPassword){
      return user;
    } 
    throw new UnauthorizedException('Password not match');
  }

  //* method create Auth Token 
  async createAuthToken(payload: {userId: string, email: string}) {
    const {token: accessToken, expired} = await this.generateToken(payload);
    const {token: refreshToken} = await this.generateToken(payload);
    return {accessToken, refreshToken, expired, tokenType: 'Bearer'};
  }

  //* method generate Token
  async generateToken(payload: {userId:string, email: string}) {
    const expired: string = moment().second(parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME)).toISOString();
    const token: string = await this.jwtService.signAsync(payload);
    return {token, expired};
  }
}