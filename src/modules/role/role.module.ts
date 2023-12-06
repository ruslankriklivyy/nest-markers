import { Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { roleProviders } from '@/modules/role/role.providers';
import { RolePermissionModule } from '@/modules/role-permission/role-permission.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [DatabaseModule, RolePermissionModule, UserModule],
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
})
export class RoleModule {}
