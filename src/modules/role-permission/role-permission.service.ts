import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RolePermission } from '@/modules/role-permission/entities/role-permission.entity';
import {
  CreateRolePermissionDto,
  UpdateRolePermissionDto,
} from '@/modules/role/dto/create-role.dto';

@Injectable()
export class RolePermissionService {
  constructor(
    @Inject('ROLE_PERMISSION_REPOSITORY')
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  getOneByRole(roleId: number, permissionId: number) {
    return this.rolePermissionRepository.findOne({
      where: { role_id: roleId, permission_id: permissionId },
    });
  }

  createOne(roleId: number, permission: CreateRolePermissionDto) {
    return this.rolePermissionRepository.save({
      role_id: roleId,
      permission_id: permission.id,
      type: permission.type,
    });
  }

  async createMany(roleId: number, permissions: CreateRolePermissionDto[]) {
    try {
      for (const permission of permissions) {
        await this.rolePermissionRepository.save({
          role_id: roleId,
          permission_id: permission.id,
          type: permission.type,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  updateOne(roleId: number, permission: UpdateRolePermissionDto) {
    return this.rolePermissionRepository.update(
      {
        role_id: roleId,
        permission_id: permission.id,
      },
      { type: permission.type },
    );
  }

  deleteOne(id: number) {
    return this.rolePermissionRepository.delete({ id });
  }
}
