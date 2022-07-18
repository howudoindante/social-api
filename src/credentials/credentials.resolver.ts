import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { CredentialsService } from './credentials.service';
import { PrivateCredentials } from './entities/credentials-private.entity';

@Resolver(() => PrivateCredentials)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Query(() => PrivateCredentials)
  @UseGuards(AuthGuard)
  getCredentials(
    @Args('accessToken') accessToken: string,
    @Args('email') email: string,
  ) {
    return this.credentialsService.findOne(email);
  }
}
