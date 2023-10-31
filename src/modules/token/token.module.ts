import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { DatabaseModule } from '@/modules/database/database.module';
import { tokenProviders } from '@/modules/token/token.providers';

@Module({
  providers: [TokenService, ...tokenProviders],
  imports: [JwtModule.register({}), DatabaseModule],
  exports: [TokenService],
})
export class TokenModule {}
