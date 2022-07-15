import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, MailService, UserService],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
})
export class AuthModule {}
