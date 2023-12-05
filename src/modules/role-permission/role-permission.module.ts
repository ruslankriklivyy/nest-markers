import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { rolePermissionProviders } from '@/modules/role-permission/role-permission.provider';
import { DatabaseModule } from '@/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RolePermissionController],
  providers: [RolePermissionService, ...rolePermissionProviders],
})
export class RolePermissionModule {}
