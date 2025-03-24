import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { UserAccessLevel } from './entities/auth.entity';

@Injectable()
export class AccessAuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader)
      throw new UnauthorizedException('No token provided');

    const token = authorizationHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decoded = await this._authService.validateToken(token);
      console.log(decoded);
      const requiredCompanies = this.reflector.get<UserAccessLevel[]>(
        'access',
        context.getHandler(),
      );

      if (!requiredCompanies) return true;

      const userCompanies = Array.isArray(decoded.payload.access)
        ? decoded.payload.access
        : [decoded.payload.access];

      const hasRequiredCompany = userCompanies.some((userAccess) =>
        requiredCompanies.includes(userAccess as UserAccessLevel),
      );

      if (hasRequiredCompany) {
        request.user = decoded.payload;
        return true;
      }
      throw new UnauthorizedException('User does not have the required role');
    } catch (error) {
      throw new UnauthorizedException('User does not have the required role');
    }
  }
}
