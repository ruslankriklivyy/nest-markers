import dataSource from '@/modules/database/database.config';
import { Permission } from '@/modules/permission/entities/permission.entity';

export default async function PermissionSeed() {
  const permissionRepository = dataSource.getRepository(Permission);

  const usersPermission = new Permission();
  usersPermission.name = 'Users';
  usersPermission.slug = 'users';

  const layersPermission = new Permission();
  layersPermission.name = 'Layers';
  layersPermission.slug = 'layers';

  const markersPermission = new Permission();
  markersPermission.name = 'Markers';
  markersPermission.slug = 'markers';

  await permissionRepository.insert([
    usersPermission,
    layersPermission,
    markersPermission,
  ]);
}
