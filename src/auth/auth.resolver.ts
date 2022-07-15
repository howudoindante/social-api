import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query(() => Auth)
  getLogin() {
    return { message: '1' };
  }
  @Mutation(() => Auth)
  register(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.register(email, password);
  }

  @Mutation(() => Auth)
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.login(email, password);
  }
}
