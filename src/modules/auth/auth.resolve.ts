import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {registerUserDto} from './dto/register.input'
import {loginUserDto} from './dto/login.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('register')
  async register(@Args('userDataInput') userDataInput: registerUserDto) { 
    return await this.authService.register(userDataInput);
  }

  @Mutation('login')
  async login(@Args('userDataInput') userDataInput: loginUserDto) {
    return await this.authService.login(userDataInput);
  }
}
 