import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(userData) {
    const { email, password, nickName, role } = userData;

    //* check email exists
    const emailExisting = await this.userService.findUserByEmail(email);
    if (emailExisting) {
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
      role,
    };

    return this.userService.createUser(newUser);
  }

  async login(userDataInput) {
    const { email, password } = userDataInput;
    const user = await this.validateUser(email, password);
    const payload = { userId: user.userId, email: user.email };
    const auth = await this.createAuthToken(payload);

    //* save refreshToken
    const { userId } = user;
    const { refreshToken } = auth;
    await this.userService.updateRefreshToken(userId, refreshToken);

    return { auth, user };
  }

  async logout(userId: string) {
    try {
      await this.userService.updateRefreshToken(userId, '');
      return 'logout success';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async refreshToken(token: string) {
    try {
      const data = await this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_KEY,
        ignoreExpiration: false,
      });

      const { userId, email } = data;
      const user = await this.userService.findUserById(userId);
      const payload = { userId, email };
      const auth = await this.createAuthToken(payload);

      return { auth, user };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  //* method validate User with "email" & "password"
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Email is not registered!');
    }
    //* compare password
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (matchPassword) {
      return user;
    }
    throw new UnauthorizedException('Password not match');
  }

  //* method create Auth Token
  async createAuthToken(payload: { userId: string; email: string }) {
    const { token: accessToken, expired } = await this.generateToken(
      payload,
      process.env.JWT_ACCESS_KEY,
      parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME)
    );
    const { token: refreshToken } = await this.generateToken(
      payload,
      process.env.JWT_REFRESH_KEY,
      parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME)
    );
    return { accessToken, refreshToken, expired, tokenType: 'Bearer' };
  }

  //* method generate Token
  async generateToken(payload: { userId: string; email: string }, secretKey: string, expTime: number) {
    const expired: string = moment().second(parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME)).toISOString();
    const token: string = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: expTime,
    });
    return { token, expired };
  }
}
