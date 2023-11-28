import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { markerProviders } from '@/modules/marker/marker.providers';
import { TokenService } from '@/modules/token/token.service';
import { AuthGuard } from '@/modules/auth/guard/auth.guard';
import { tokenProviders } from '@/modules/token/token.providers';

@Module({
  providers: [
    MarkerService,
    AuthGuard,
    TokenService,
    ...tokenProviders,
    ...markerProviders,
  ],
  controllers: [MarkerController],
  imports: [JwtModule.register({}), DatabaseModule],
})
export class MarkerModule {}
