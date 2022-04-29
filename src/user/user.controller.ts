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
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { TokenService } from '../token/token.service';
import { Response, Request } from 'express';
import { UserDto } from './dto/user.dto';
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
    console.log(req.cookies);
    const { email } = await this.tokenService.validateRefreshToken(
      refresh_token,
    );
    const user = await this.userService.getOneUser(email);
    const userDto = new UserDto(user);

    return userDto;
  }

  @Patch('user/:id')
  async update(@Param() { id }, @Body() dto: UserUpdateDto) {
    return this.userService.update(id, dto);
  }
}
