import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { markerProviders } from '@/modules/marker/marker.providers';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { UserModule } from '@/modules/user/user.module';
import { TokenModule } from '@/modules/token/token.module';
import { FileModule } from '@/modules/file/file.module';
import { LayerModule } from '@/modules/layer/layer.module';

@Module({
  imports: [
    JwtModule.register({}),
    DatabaseModule,
    TokenModule,
    FileModule,
    UserModule,
    LayerModule,
  ],
  providers: [MarkerService, JwtAuthGuard, ...markerProviders],
  controllers: [MarkerController],
})
export class MarkerModule {}
