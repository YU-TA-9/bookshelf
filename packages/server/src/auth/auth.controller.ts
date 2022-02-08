import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginGoogleDto } from './dtos/login-google.dto';
import { LoginResponseDto } from './dtos/login-response.dto';

@Controller()
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('/login/google')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginGoogleDto,
  })
  loginGoogle(
    @Body() loginGoogleDto: LoginGoogleDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    return this.authService.loginGoogle(loginGoogleDto, res);
  }

  @Post('/register/google')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: LoginGoogleDto,
  })
  registerGoogle(
    @Body() loginGoogleDto: LoginGoogleDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    return this.authService.registerGoogle(loginGoogleDto, res);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(res);
  }
}
