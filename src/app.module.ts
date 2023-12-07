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
import { DatabaseModule } from '@/modules/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/modules/database/database.config';
import { CustomFieldTypeModule } from '@/modules/custom-field-type/custom-field-type.module';
import { RoleModule } from '@/modules/role/role.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import { RolePermissionModule } from '@/modules/role-permission/role-permission.module';
import { NotificationModule } from '@/modules/notification/notification.module';

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
    DatabaseModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    CustomFieldTypeModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    NotificationModule,
  ],
})
export class AppModule {}
