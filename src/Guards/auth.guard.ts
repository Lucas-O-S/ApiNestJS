import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../Auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.CheckToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayLoad = data;
      request.user = await this.userService.Show(data.id);

      return true;
    } catch {
      return false;
    }
  }
}
