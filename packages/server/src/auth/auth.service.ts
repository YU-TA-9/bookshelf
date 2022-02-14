import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Provider, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginGoogleDto } from './dtos/login-google.dto';
import { Response } from 'express';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { CreateUserWithProviderDto } from '../users/dtos/create-user-with-provider.dto';
import { CurrentUser, User } from '../users/user.entity';
import { LoginResponseDto } from './dtos/login-response.dto';

export interface jwtPayload {
  id: number;
}

const googleOAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const domain =
  process.env.NODE_ENV === 'production' ? `${process.env.DOMAIN}` : 'localhost';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: jwtPayload): Promise<CurrentUser> {
    const user = await this.usersService.findOne(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }

  async loginGoogle(
    loginGoogleDto: LoginGoogleDto,
    res: Response,
  ): Promise<LoginResponseDto> {
    const ticket = await this.googleVerifyIdToken(loginGoogleDto);
    const { sub } = ticket.getPayload();

    const user = await this.usersService.findOneWithProvider(
      Provider.GOOGLE,
      sub,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload: jwtPayload = { id: user.id };
    await this.setToken(payload, res);

    return this.generateClientState(user);
  }

  async registerGoogle(
    loginGoogleDto: LoginGoogleDto,
    res: Response,
  ): Promise<LoginResponseDto> {
    const ticket = await this.googleVerifyIdToken(loginGoogleDto);
    const { sub, email, given_name, family_name, picture } =
      ticket.getPayload();

    const dto = new CreateUserWithProviderDto();
    dto.providerUserId = sub;
    dto.email = email;
    dto.firstName = given_name;
    dto.lastName = family_name;
    dto.iconUrl = picture;

    const user = await this.usersService.createUserWithProvider(
      Provider.GOOGLE,
      dto,
    );

    const payload: jwtPayload = { id: user.id };
    await this.setToken(payload, res);

    return this.generateClientState(user);
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('access_token');
  }

  private async googleVerifyIdToken(
    loginGoogleDto: LoginGoogleDto,
  ): Promise<LoginTicket> {
    const ticket = await googleOAuth2Client.verifyIdToken({
      idToken: loginGoogleDto.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket;
  }

  private async setToken(payload: jwtPayload, res: Response): Promise<void> {
    // Token作成
    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
    });
    res.cookie('access_token', token, {
      httpOnly: true,
      domain: domain,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
  }

  private generateClientState(user: User): LoginResponseDto {
    return { firstName: user.firstName, lastName: user.lastName };
  }
}
