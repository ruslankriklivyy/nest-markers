import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenService } from '../token/token.service';
import { DatabaseModule } from '@/modules/database/database.module';
import { userProviders } from '@/modules/user/user.providers';
import { tokenProviders } from '@/modules/token/token.providers';
import { FileModule } from '@/modules/file/file.module';

@Module({
  controllers: [UserController],
  providers: [UserService, TokenService, ...userProviders, ...tokenProviders],
  imports: [JwtModule.register({}), DatabaseModule, FileModule],
  exports: [UserService],
})
export class UserModule {}
