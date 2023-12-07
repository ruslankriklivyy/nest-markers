import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { UserRegistrationDto } from '../user/dto/user-registration.dto';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AuthResultDto } from '@/modules/auth/dto/auth-result.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '@/modules/user/entities/user.entity';
import { RefreshAuthDto } from '@/modules/auth/dto/refresh-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('registration')
  @ApiResponse({ type: AuthResultDto })
  registration(@Body() dto: UserRegistrationDto) {
    return this.authService.registration(dto);
  }

  @Post('login')
  @ApiResponse({ type: AuthResultDto })
  login(@Body() dto: UserLoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@CurrentUser() user: User) {
    return this.authService.logout(user.id);
  }

  @Get('refresh')
  async refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    return this.authService.refresh(refreshAuthDto);
  }

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
