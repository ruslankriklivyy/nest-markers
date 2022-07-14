import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenService } from '../token/token.service';

import { User, UserSchema } from './schemas/user.schema';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, TokenService, JwtStrategy],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
})
export class UserModule {}
