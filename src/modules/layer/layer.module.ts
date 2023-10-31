import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { TokenService } from '../token/token.service';
import { DatabaseModule } from '@/modules/database/database.module';
import { layerProviders } from '@/modules/layer/layer.providers';
import { UserService } from '@/modules/user/user.service';
import { tokenProviders } from '@/modules/token/token.providers';
import { userProviders } from '@/modules/user/user.providers';

@Module({
  providers: [
    LayerService,
    TokenService,
    UserService,
    ...layerProviders,
    ...tokenProviders,
    ...userProviders,
  ],
  controllers: [LayerController],
  imports: [JwtModule.register({}), DatabaseModule],
})
export class LayerModule {}
