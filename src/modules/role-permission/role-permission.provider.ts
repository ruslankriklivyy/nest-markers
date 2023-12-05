import { DataSource } from 'typeorm';

import { RolePermission } from '@/modules/role-permission/entities/role-permission.entity';

export const rolePermissionProviders = [
  {
    provide: 'ROLE_PERMISSION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RolePermission),
    inject: ['DATA_SOURCE'],
  },
];
