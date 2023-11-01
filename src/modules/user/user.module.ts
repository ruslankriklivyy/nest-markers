import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenService } from '../token/token.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { DatabaseModule } from '@/modules/database/database.module';
import { userProviders } from '@/modules/user/user.providers';
import { tokenProviders } from '@/modules/token/token.providers';
import { markerProviders } from '@/modules/marker/marker.providers';
import { FileService } from '@/modules/file/file.service';
import { fileProviders } from '@/modules/file/file.providers';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    TokenService,
    FileService,
    JwtStrategy,
    ...fileProviders,
    ...userProviders,
    ...tokenProviders,
    ...markerProviders,
  ],
  imports: [JwtModule.register({}), DatabaseModule],
})
export class UserModule {}
