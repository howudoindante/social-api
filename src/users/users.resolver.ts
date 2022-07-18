import { Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Query(() => PublicUser)
  // createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
  //   return this.tokenService.create(createTokenInput);
  // }
}
