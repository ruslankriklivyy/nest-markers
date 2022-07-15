import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Token, TokenDocument } from './schemas/token.schema';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(user: UserDto) {
    const payload = { ...user, id: user.id.toString() };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async generateTokensFromGoogle(payload) {
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return tokenData.save();
    }

    return await this.tokenModel.create({
      user: userId,
      refresh_token: refreshToken,
    });
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findRefreshToken(refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ refreshToken });
    return tokenData;
  }

  validateRefreshToken(token: string) {
    try {
      const decodedData = this.jwt.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      return decodedData;
    } catch (error) {
      return null;
    }
  }
}
