import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';

@Module({
  exports: [TokenService],
  providers: [TokenResolver, TokenService],
})
export class TokenModule {}
