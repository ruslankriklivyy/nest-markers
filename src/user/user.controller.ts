import {
  Controller,
  Get,
  Req,
  Res,
  Patch,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { TokenService } from '../token/token.service';
import { UserUpdateDto } from './dto/user-update.dto';

@UseGuards(JwtGuard)
@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Get('users')
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('user')
  async getOne(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const { refresh_token } = req.cookies;
    const { email } = await this.tokenService.validateRefreshToken(
      refresh_token,
    );

    return this.userService.getOneUser(email);
  }

  @Patch('user/:id')
  async updateOne(@Param() { id }, @Body() dto: UserUpdateDto) {
    return this.userService.updateOne(id, dto);
  }
}
