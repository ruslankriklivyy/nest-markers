import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { UserRegistrationDto } from '../user/dto/user-registration.dto';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('registration')
  async registration(
    @Body() dto: UserRegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.registration(dto);

    res.cookie('refresh_token', data.refresh_token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      sameSite: 'none',
      secure: true,
    });

    return data;
  }

  @Post('login')
  async login(
    @Body() dto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(dto);

    res.cookie('refresh_token', data.refresh_token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      sameSite: 'none',
      secure: true,
    });

    return data;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refresh_token } = req.cookies;

    res.set('Authorization', '');
    res.clearCookie('refresh_token');

    return await this.authService.logout(refresh_token);
  }

  @Get('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const { refresh_token } = req.cookies;
    const data = await this.authService.refresh(refresh_token);

    res.cookie('refresh_token', data.refresh_token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      sameSite: 'none',
      secure: true,
    });

    return data;
  }

  // @Get('activate/:link')
  // @Redirect()
  // async activate(@Param() { link }) {
  //   const url = this.configService.get('CLIENT_URL');
  //
  //   await this.authService.activate(link);
  //
  //   return { url };
  // }

  @Post('google')
  async googleAuth(
    @Res({ passthrough: true }) res: Response,
    @Body() { accessToken },
  ) {
    const data = await this.authService.signInFromGoogle(accessToken);

    res.cookie('refresh_token', data.refresh_token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      sameSite: 'none',
      secure: true,
    });

    return data;
  }
}
