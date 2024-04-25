import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../modules/users/entities/user.entity';

export type RequestUser = Pick<User, 'id' | 'email' | 'role'>;
export interface AuthenticatedRequest extends Request {
  user: RequestUser;
}

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
