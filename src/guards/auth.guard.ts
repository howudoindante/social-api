import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
@Injectable()
export class AuthGuard implements CanActivate {
  validateRequest(context: any) {
    console.log(context);
    console.log(context.args[1].accessToken);

    return true;
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return this.validateRequest(context);
  }
}
