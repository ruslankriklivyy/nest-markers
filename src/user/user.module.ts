import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { TokenService } from '../token/token.service';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

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
