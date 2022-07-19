import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { Token } from './entities/token.entity';
import { HttpException } from '@nestjs/common';
import { ITokenDecoded } from './types.token';
import { JWT } from '../token/entities/jwt.entity';
@Resolver(() => Token)
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => JWT)
  async getNewTokenPair(@Args('refreshToken') refreshToken: string) {
    let isTokenRight = false;
    const userData = await this.tokenService.verifyToken<ITokenDecoded>(
      refreshToken,
      'refresh',
    );

    if (userData) {
      const tokenRecord = await this.tokenService.getTokenRecord({
        id: userData.id,
      });
      isTokenRight = tokenRecord.refreshToken === refreshToken ? true : false;
    }
    if (isTokenRight) {
      return this.tokenService.createTokens(userData.id, {
        id: userData.id,
        email: userData.email,
      });
    } else throw new HttpException('Invalid token', 401);
  }
  // @Mutation(() => Token)
  // createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
  //   return this.tokenService.create(createTokenInput);
  // }

  // @Mutation(() => Token)
  // updateToken(@Args('updateTokenInput') updateTokenInput: UpdateTokenInput) {
  //   return this.tokenService.update(updateTokenInput.id, updateTokenInput);
  // }

  // @Mutation(() => Token)
  // removeToken(@Args('id', { type: () => Int }) id: number) {
  //   return this.tokenService.remove(id);
  // }
}
