import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    console.log(request.isAuthenticated())
    return request.isAuthenticated()
  }
}
