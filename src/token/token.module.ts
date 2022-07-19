import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
@Global()
@Module({
  exports: [TokenService],
  providers: [TokenResolver, TokenService],
})
export class TokenModule {}
