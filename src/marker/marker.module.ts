import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Marker, MarkerSchema } from './schemas/marker.schema';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { TokenService } from '../token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { Layer, LayerSchema } from '../layer/schemas/layer.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  providers: [MarkerService, TokenService],
  controllers: [MarkerController],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Marker.name, schema: MarkerSchema },
      { name: Token.name, schema: TokenSchema },
      { name: Layer.name, schema: LayerSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class MarkerModule {}
