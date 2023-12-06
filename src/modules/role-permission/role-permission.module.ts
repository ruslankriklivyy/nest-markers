import { Module } from '@nestjs/common';

import { RolePermissionService } from './role-permission.service';
import { rolePermissionProviders } from '@/modules/role-permission/role-permission.provider';
import { DatabaseModule } from '@/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RolePermissionService, ...rolePermissionProviders],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
