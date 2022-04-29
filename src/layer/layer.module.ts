import { Module } from '@nestjs/common';
import { LayerController } from './layer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Layer, LayerSchema } from './schemas/layer.schema';
import { LayerService } from './layer.service';
import { Marker, MarkerSchema } from '../marker/schemas/marker.schema';
import { TokenService } from '../token/token.service';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  providers: [LayerService, TokenService],
  controllers: [LayerController],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Layer.name, schema: LayerSchema },
      { name: Marker.name, schema: MarkerSchema },
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class LayerModule {}
