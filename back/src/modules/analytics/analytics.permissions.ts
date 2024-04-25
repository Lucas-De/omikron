import { ForbiddenException, Injectable } from '@nestjs/common';
import { RequestUser } from '../../common/decorators/user.decorator';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AnalyticsPermissions {
  async canGetAnalyticsForUser(user: RequestUser, accessedUserId: number) {
    const isSelf = user.id === accessedUserId;
    const isAdmin = user.role === UserRole.Admin;
    if (!isSelf && !isAdmin) throw new ForbiddenException();
  }
}
