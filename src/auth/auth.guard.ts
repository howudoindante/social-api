import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { ITokenDecoded } from 'src/token/types.token';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {}
  validateRequest(context: any) {
    const { accessToken } = context.args[1];
    const userData = this.tokenService.verifyToken<ITokenDecoded>(
      accessToken,
      'access',
    );
    console.log(userData);

    if (userData) return true;
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return this.validateRequest(context);
  }
}
