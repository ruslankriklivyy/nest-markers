import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { User, UserDocument } from '../user/schemas/user.schema';
import { TokenService } from '../token/token.service';
import { UserRegistrationDto } from '../user/dto/user-registration.dto';
import { IUserAuth, UserDto } from '../user/dto/user.dto';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private httpService: HttpService,
    private tokenService: TokenService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async registration(userDto: UserRegistrationDto) {
    const { full_name, email, password } = userDto;
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'There is already a user with this email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await this.userModel.create({
      full_name,
      email,
      password: hashPassword,
      activation_link: activationLink,
      is_activated: false,
    });

    const activationUrl = `${this.configService.get(
      'API_URL',
    )}/api/auth/activate/${activationLink}`;

    // TODO: send activation url to email
    // await this.mailService.sendUserConfirmation(newUser, activationUrl);

    const newUserDto = new UserDto(newUser);
    const tokens = await this.tokenService.generateTokens(newUserDto);

    await this.tokenService.saveToken(newUserDto.id, tokens.refresh_token);

    return { ...tokens, user: newUserDto };
  }

  async login(userDto: UserLoginDto) {
    const { email, password } = userDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordEquals = bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid password or email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUserDto = new UserDto(user);
    const tokens = await this.tokenService.generateTokens({ ...newUserDto });

    await this.tokenService.saveToken(newUserDto.id, tokens.refresh_token);

    return { ...tokens, user: newUserDto };
  }

  async signInFromGoogle(accessToken: string): Promise<IUserAuth> {
    return new Promise((resolve) => {
      this.httpService
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`,
        )
        .subscribe(
          async ({ data }) => {
            const userFromBD = await this.userModel.findOne({
              email: data.email,
            });

            const activationLink = uuid.v4();

            const newUser = {
              avatar: { url: data.picture },
              full_name: data.name,
              email: data.email,
              activation_link: activationLink,
              is_activated: false,
            };

            const activationUrl = `${this.configService.get(
              'API_URL',
            )}/api/auth/activate/${activationLink}`;

            if (!userFromBD) {
              const user = await this.userModel.create(newUser);
              const tokens = await this.tokenService.generateTokensFromGoogle(
                newUser,
              );

              await this.tokenService.saveToken(user._id, tokens.refresh_token);
              // TODO: send activation url to email
              // await this.mailService.sendUserConfirmation(user, activationUrl);

              return resolve({ ...tokens, user });
            }

            const tokens = await this.tokenService.generateTokensFromGoogle(
              newUser,
            );

            await this.tokenService.saveToken(
              userFromBD._id,
              tokens.refresh_token,
            );

            resolve({ ...tokens, user: userFromBD });
          },
          (error) => {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
              },
              HttpStatus.BAD_REQUEST,
            );
          },
        );
    });
  }

  async activate(activationLink: string) {
    const user = await this.userModel.findOne({
      activation_link: activationLink,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect activation link',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.is_activated = true;

    await user.save();
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

    const decodedData = (await this.tokenService.validateRefreshToken(
      refreshToken,
    )) as UserDto;
    const user = await this.userModel.findOne({
      email: decodedData.email,
    });
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

    const userDto = new UserDto(user);
    const tokens = await this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refresh_token);

    return { ...tokens, user: userDto };
  }
}
