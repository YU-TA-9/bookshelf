import { ExecutionContext } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import User from '../factories/user.factory';

export const loginAs = (user: User): void => {
  JwtAuthGuard.prototype.canActivate = jest.fn(
    async (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = { id: user.id };
      return true;
    },
  );
};

export const serialize = (object: any): string => {
  return JSON.stringify(instanceToPlain(object));
};
