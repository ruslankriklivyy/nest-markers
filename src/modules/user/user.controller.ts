import {
  Controller,
  Get,
  Req,
  Param,
  UseGuards,
  Body,
  Put,
} from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { TokenService } from '@/modules/token/token.service';
import { UpdateUserDto } from '@/modules/user/dto/user-update.dto';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Get()
  getAll() {
    return this.userService.getAll(['avatar', 'role', 'role.permissions']);
  }

  @Get('current')
  async getOne(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    const { email } =
      await this.tokenService.validateRefreshToken(refresh_token);

    return this.userService.getOneByEmail(email);
  }

  @Put(':id')
  updateOne(@Param() { id }, @Body() dto: UpdateUserDto) {
    return this.userService.updateOne(id, dto);
  }
}
