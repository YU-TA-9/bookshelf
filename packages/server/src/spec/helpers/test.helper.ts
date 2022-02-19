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

export const getRandomColorCode = (): string => {
  let randomColorCode = '';
  for (let i = 0; i < 6; i++) {
    randomColorCode += '0123456789abcdef'[(16 * Math.random()) | 0];
  }
  return randomColorCode;
};
