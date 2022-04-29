import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MarkerModule } from './marker/marker.module';
import { FileModule } from './file/file.module';
import { LayerModule } from './layer/layer.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    TokenModule,
    UserModule,
    AuthModule,
    MarkerModule,
    FileModule,
    LayerModule,
    MailModule,
  ],
})
export class AppModule {}
