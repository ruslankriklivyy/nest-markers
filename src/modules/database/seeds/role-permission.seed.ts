import dataSource from '@/modules/database/database.config';
import { RolePermission } from '@/modules/role-permission/entities/role-permission.entity';
import { PermissionType } from '@/modules/permission/enums/permission-type.enum';

export default async function RolePermissionSeed() {
  const rolePermissionRepository = dataSource.getRepository(RolePermission);

  const adminRoleUsersPermission = new RolePermission();
  adminRoleUsersPermission.role_id = 1;
  adminRoleUsersPermission.permission_id = 1;
  adminRoleUsersPermission.type = PermissionType.Editable;

  const adminRoleLayersPermission = new RolePermission();
  adminRoleLayersPermission.role_id = 1;
  adminRoleLayersPermission.permission_id = 2;
  adminRoleLayersPermission.type = PermissionType.Editable;

  const adminRoleMarkersPermission = new RolePermission();
  adminRoleMarkersPermission.role_id = 1;
  adminRoleMarkersPermission.permission_id = 3;
  adminRoleMarkersPermission.type = PermissionType.Editable;

  await rolePermissionRepository.insert([
    adminRoleUsersPermission,
    adminRoleLayersPermission,
    adminRoleMarkersPermission,
  ]);
}
