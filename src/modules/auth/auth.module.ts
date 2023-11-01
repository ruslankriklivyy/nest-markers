import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { DatabaseModule } from '@/modules/database/database.module';
import { tokenProviders } from '@/modules/token/token.providers';
import { userProviders } from '@/modules/user/user.providers';
import { fileProviders } from '@/modules/file/file.providers';
import { FileService } from '@/modules/file/file.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    MailService,
    UserService,
    FileService,
    ...tokenProviders,
    ...userProviders,
    ...fileProviders,
  ],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule.register({}),
    DatabaseModule,
  ],
})
export class AuthModule {}
