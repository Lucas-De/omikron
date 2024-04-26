import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, TokenExpiredError, JwtPayload } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.entity';
import { IS_PUBLIC_KEY } from '../../common/decorators/is-public.decorator';
import { IS_ADMIN_KEY } from '../../common/decorators/is-admin.decorator';
import { AuthenticatedRequest } from '../../common/decorators/user.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = req.header('Authorization');

    try {
      const { id, email, role } = this.decodeJwtAuthHeader(authHeader);
      req.user = { id, email, role };
    } catch (err) {
      this.handleTokenError(err);
    }

    //TODO: this should be in an authorization guard instead of an authentication guard
    const requireAdmin = this.reflector.get(IS_ADMIN_KEY, context.getHandler());
    const userIsAdmin = req.user.role === UserRole.Admin;
    if (requireAdmin && !userIsAdmin) {
      throw new ForbiddenException('User may not access admin routes');
    }

    return true;
  }

  private decodeJwtAuthHeader(authHeader: string): JwtPayload {
    const hasBearerPrefix = authHeader && authHeader.startsWith('Bearer ');
    if (!hasBearerPrefix) throw new Error();

    const token = authHeader.split(' ')[1];
    return verify(token, process.env.JWT_SECRET) as JwtPayload;
  }

  private handleTokenError(err: Error) {
    const message =
      err instanceof TokenExpiredError
        ? `Token expired at ${new Date(err.expiredAt)}`
        : 'Invalid Token';

    throw new UnauthorizedException(message);
  }
}
