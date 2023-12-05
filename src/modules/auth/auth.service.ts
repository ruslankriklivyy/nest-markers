import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { TokenService } from '../token/token.service';
import { UserRegistrationDto } from '../user/dto/user-registration.dto';
import { IUserAuth } from '../user/dto/user.dto';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { UserService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private tokenService: TokenService,
  ) {}

  async registration(userDto: UserRegistrationDto) {
    const { full_name, email, password, avatar_id } = userDto;
    const user = await this.userService.getOneByEmail(email);

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'There is already a user with this email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await this.userService.create({
      full_name,
      email,
      avatar_id,
      password: hashPassword,
      is_activated: false,
    });

    const tokens = await this.tokenService.generateTokens(newUser);

    await this.tokenService.saveToken(newUser.id, tokens.refresh_token);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...userInfo } = newUser;

    return { ...tokens, user: userInfo };
  }

  async login(userDto: UserLoginDto) {
    const { email, password } = userDto;
    const user = await this.userService.getOneByEmail(email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid password or email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = await this.tokenService.generateTokens({ ...user });

    await this.tokenService.saveToken(user.id, tokens.refresh_token);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...userInfo } = user;

    return { ...tokens, user: userInfo };
  }

  async signInFromGoogle(accessToken: string): Promise<IUserAuth> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`,
      ),
    );

    const userFromBD = await this.userService.getOneByEmail(data.email);

    const newUser: CreateUserDto = {
      full_name: data.name,
      email: data.email,
      is_activated: false,
    };

    if (!userFromBD) {
      const user = await this.userService.create(newUser);
      const tokens = await this.tokenService.generateTokensFromGoogle(newUser);

      await this.tokenService.saveToken(user.id, tokens.refresh_token);

      return { ...tokens, user };
    }

    const tokens = await this.tokenService.generateTokensFromGoogle(newUser);

    await this.tokenService.saveToken(userFromBD.id, tokens.refresh_token);
  }

  async logout(refreshToken: string) {
    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const decodedData =
      await this.tokenService.validateRefreshToken(refreshToken);
    const user = await this.userService.getOneByEmail(decodedData.email);
    const token = await this.tokenService.findRefreshToken(refreshToken);

    if (!decodedData || !token) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokens = await this.tokenService.generateTokens({ ...user });

    await this.tokenService.saveToken(user.id, tokens.refresh_token);

    return { ...tokens, user };
  }
}
