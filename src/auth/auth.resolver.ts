import { Res, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { Login } from './entities/login.entity';
import { Status } from './entities/status.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query(() => Auth)
  requestVerification() {
    // return this.authService.verificateAccount();
  }
  @Mutation(() => Auth)
  verificateAccount(@Args('code') code: number) {
    // return this.authService.verificateAccount();
  }
  @Mutation(() => Auth)
  register(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.register(email, password);
  }
  @Mutation(() => Status)
  async logout(@Args('email') email: string) {
    return this.authService.logout(email);
  }
  @Mutation(() => Login)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
