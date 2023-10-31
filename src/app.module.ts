import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TokenModule } from '@/modules/token/token.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MarkerModule } from '@/modules/marker/marker.module';
import { FileModule } from '@/modules/file/file.module';
import { LayerModule } from '@/modules/layer/layer.module';
import { MailModule } from '@/modules/mail/mail.module';
import { CustomFieldModule } from '@/modules/custom-field/custom-field.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
    UserModule,
    AuthModule,
    MarkerModule,
    FileModule,
    LayerModule,
    MailModule,
    CustomFieldModule,
  ],
})
export class AppModule {}
