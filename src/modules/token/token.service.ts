import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Token } from '@/modules/token/entities/token.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY') private tokenRepository: Repository<Token>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(user: any) {
    const payload = { ...user, id: user.id };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async generateTokensFromGoogle(payload: CreateUserDto) {
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOneBy({
      user: { id: userId },
    });

    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return tokenData.save();
    }

    return this.tokenRepository.save({
      user: { id: userId },
      refresh_token: refreshToken,
    });
  }

  removeToken(refreshToken: string) {
    return this.tokenRepository.delete({ refresh_token: refreshToken });
  }

  findRefreshToken(refreshToken: string) {
    return this.tokenRepository.findOneBy({ refresh_token: refreshToken });
  }

  validateRefreshToken(token: string) {
    try {
      return this.jwt.verify(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      return null;
    }
  }
}
