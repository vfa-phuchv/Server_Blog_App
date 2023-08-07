import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/register.input';
import { loginUserDto } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlUser } from '../../decorators/user.decorator';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { UserEntity } from '../../entities/user.entity';
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

  @Mutation('refreshToken')
  async refreshToken(@Args('refreshToken') token: string) {
    return await this.authService.refreshToken(token);
  }

  @Mutation('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@GqlUser() user: UserEntity) {
    const { userId } = user;
    return await this.authService.logout(userId);
  }
}
