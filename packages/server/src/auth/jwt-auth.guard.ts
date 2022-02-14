import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/user.entity';

export interface AuthenticatedRequest extends Request {
  user: CurrentUser;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
