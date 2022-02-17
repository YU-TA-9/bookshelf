import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthenticatedRequest, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User })
  getUser(@Req() req: AuthenticatedRequest): Promise<User> {
    return this.usersService.findOne(req.user.id);
  }
}
