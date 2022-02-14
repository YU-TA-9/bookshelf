import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService, jwtPayload } from './auth.service';
import { CurrentUser } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if (!req || !req.cookies) {
            return null;
          }
          return req.cookies['access_token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.TOKEN_SECRET}`, // stringに変換しないと動かない
    });
  }

  async validate(payload: jwtPayload): Promise<CurrentUser> {
    const currentUser = await this.authService.validateUser(payload);
    return currentUser;
  }
}
