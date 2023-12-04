import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { DatabaseModule } from '@/modules/database/database.module';
import { layerProviders } from '@/modules/layer/layer.providers';
import { UserModule } from '@/modules/user/user.module';

@Module({
  providers: [LayerService, ...layerProviders],
  controllers: [LayerController],
  imports: [JwtModule.register({}), DatabaseModule, UserModule],
  exports: [LayerService],
})
export class LayerModule {}
