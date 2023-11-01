import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import * as uuid from 'uuid';
import { ConfigService } from '@nestjs/config';
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
    private configService: ConfigService,
  ) {}

  async registration(userDto: UserRegistrationDto) {
    const { full_name, email, password, avatar_id } = userDto;
    const user = await this.userService.getOne(email);

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'There is already a user with this email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await this.userService.create({
      full_name,
      email,
      avatar_id,
      password: hashPassword,
      is_activated: false,
    });

    // const activationUrl = `${this.configService.get(
    //   'API_URL',
    // )}/api/auth/activate/${activationLink}`;

    // TODO: send activation url to email
    // await this.mailService.sendUserConfirmation(newUser, activationUrl);

    const tokens = await this.tokenService.generateTokens(newUser);

    await this.tokenService.saveToken(newUser.id, tokens.refresh_token);

    return { ...tokens, user: newUser };
  }

  async login(userDto: UserLoginDto) {
    const { email, password } = userDto;
    const user = await this.userService.getOne(email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    console.log('USER', user);

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

    return { ...tokens, user: user };
  }

  async signInFromGoogle(accessToken: string): Promise<IUserAuth> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`,
      ),
    );

    const userFromBD = await this.userService.getOne(data.email);

    // const activationLink = uuid.v4();

    const newUser: CreateUserDto = {
      full_name: data.name,
      email: data.email,
      is_activated: false,
    };

    // const activationUrl = `${this.configService.get(
    //   'API_URL',
    // )}/api/auth/activate/${activationLink}`;

    if (!userFromBD) {
      const user = await this.userService.create(newUser);
      const tokens = await this.tokenService.generateTokensFromGoogle(newUser);

      await this.tokenService.saveToken(user.id, tokens.refresh_token);
      // TODO: send activation url to email
      // await this.mailService.sendUserConfirmation(user, activationUrl);

      return { ...tokens, user };
    }

    const tokens = await this.tokenService.generateTokensFromGoogle(newUser);

    await this.tokenService.saveToken(userFromBD.id, tokens.refresh_token);
  }

  // async activate(activationLink: string) {
  //   const user = await this.userModel.findOne({
  //     activation_link: activationLink,
  //   });
  //
  //   if (!user) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         error: 'Incorrect activation link',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //
  //   user.is_activated = true;
  //
  //   await user.save();
  // }

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
    const user = await this.userService.getOne(decodedData.email);
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
