import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
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

  async validate(payload: any): Promise<any> {
    return { userId: payload.id };
  }
}
