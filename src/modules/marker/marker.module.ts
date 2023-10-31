import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { markerProviders } from '@/modules/marker/marker.providers';

@Module({
  providers: [MarkerService, ...markerProviders],
  controllers: [MarkerController],
  imports: [JwtModule.register({}), DatabaseModule],
})
export class MarkerModule {}
