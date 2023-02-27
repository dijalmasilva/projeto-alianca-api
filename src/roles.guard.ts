import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/constants/role.constants';
import { ROLES_KEY } from 'src/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log(`required roles: ${requiredRoles}`);
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
