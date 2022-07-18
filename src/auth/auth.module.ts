import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [CredentialsModule, TokenModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
