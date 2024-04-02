import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { verify, TokenExpiredError, JwtPayload } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

const IS_ADMIN_KEY = 'isAdmin';
export const IsAdmin = () => SetMetadata(IS_ADMIN_KEY, true);

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
      req.user = decodeJwtAuthHeader(authHeader);
    } catch (err) {
      handleTokenError(err);
    }

    const isAdmin = this.reflector.get(IS_ADMIN_KEY, context.getHandler());
    if (isAdmin && req.user.role !== UserRole.Admin) {
      new HttpException('User may not access admin routes', 403);
    }

    return true;
  }
}

function decodeJwtAuthHeader(authHeader: string): JwtPayload {
  const hasBearerPrefix = authHeader && authHeader.startsWith('Bearer ');
  if (!hasBearerPrefix) throw new Error();

  const token = authHeader.split(' ')[1];
  return verify(token, process.env.JWT_SECRET) as JwtPayload;
}

function handleTokenError(err: Error) {
  const message =
    err instanceof TokenExpiredError
      ? `Token expired at ${new Date(err.expiredAt)}`
      : 'Invalid Token';

  throw new HttpException(message, 401);
}
