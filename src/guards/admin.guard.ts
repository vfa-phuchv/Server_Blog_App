import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userSerivce: UserService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (request.user) {
      const { user } = request;
      const isAdmin = await this.userSerivce.isAdmin(user.userId);
      if (isAdmin) {
        return request.user;
      }
    }
    throw new AuthenticationError('You dont have permissions.');
  }
}
