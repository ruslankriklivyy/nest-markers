import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RolePermission } from '@/modules/role-permission/entities/role-permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @Inject('ROLE_PERMISSION_REPOSITORY')
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}
}
