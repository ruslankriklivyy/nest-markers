import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokenService],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  exports: [TokenService],
})
export class TokenModule {}
