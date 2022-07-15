import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  providers: [TokenService],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  exports: [TokenService],
})
export class TokenModule {}
