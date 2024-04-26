import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationGuard } from './authentication.guard';
import { Reflector } from '@nestjs/core';
import { createMock } from '@golevelup/ts-jest';
import { IS_PUBLIC_KEY } from '../../common/decorators/is-public.decorator';
import { IS_ADMIN_KEY } from '../../common/decorators/is-admin.decorator';
import { sign } from 'jsonwebtoken';
import { UserRole } from '../users/entities/user.entity';

const JWT_SECRET = 'secret';
function contextFactory(
  type: 'expired' | 'common' | 'admin' | 'invalid' | 'no-token',
) {
  const id = 1;
  const email = 'test@test.com';

  const tokens = {
    common: sign({ id, email, role: UserRole.Common }, JWT_SECRET),
    admin: sign({ id, email, role: UserRole.Admin }, JWT_SECRET),
    invalid: sign({ id, email, role: UserRole.Common }, 'invalid-secret'),
    expired: sign({ id, email, role: UserRole.Admin }, JWT_SECRET, {
      expiresIn: 0,
    }),
  };

  return createMock<ExecutionContext>({
    switchToHttp: () => ({
      getRequest: () => ({
        header: () => (type === 'no-token' ? null : `Bearer ${tokens[type]}`),
      }),
    }),
  });
}

describe('Authentication Guard', () => {
  let authenticationGuard: AuthenticationGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    reflector = new Reflector();
    authenticationGuard = new AuthenticationGuard(reflector);
    process.env.JWT_SECRET = JWT_SECRET;
  });

  it('canActivate (public route)', () => {
    jest
      .spyOn(reflector, 'get')
      .mockImplementation((key) => key === IS_PUBLIC_KEY); //pretend isPublic metadata is set to true

    const noTokenContext = contextFactory('no-token');
    expect(authenticationGuard.canActivate(noTokenContext)).toEqual(true);
  });

  it('canActivate (admin route)', () => {
    jest.spyOn(reflector, 'get').mockImplementation((key) => {
      if (key === IS_ADMIN_KEY) return true;
      return false;
    }); //pretend isAdmin metadata is true

    const adminContext = contextFactory('admin');
    expect(authenticationGuard.canActivate(adminContext)).toEqual(true);

    const commonContext = contextFactory('common');
    expect(() => authenticationGuard.canActivate(commonContext)).toThrow(
      ForbiddenException,
    );
  });

  it('canActivate (common route)', () => {
    const commonContext = contextFactory('common');
    expect(authenticationGuard.canActivate(commonContext)).toEqual(true);

    const adminContext = contextFactory('admin');
    expect(authenticationGuard.canActivate(adminContext)).toEqual(true);
  });

  it('canActivate (wrong token)', () => {
    const invalidTokenContext = contextFactory('invalid');
    expect(() => authenticationGuard.canActivate(invalidTokenContext)).toThrow(
      UnauthorizedException,
    );
  });

  it('canActivate (expired token)', () => {
    const expiredTokenContext = contextFactory('expired');
    expect(() => authenticationGuard.canActivate(expiredTokenContext)).toThrow(
      UnauthorizedException,
    );
  });
});
