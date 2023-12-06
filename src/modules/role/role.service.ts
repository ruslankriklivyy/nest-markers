import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { difference } from 'lodash';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '@/modules/role/entities/role.entity';
import { RolePermissionService } from '@/modules/role-permission/role-permission.service';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private roleRepository: Repository<Role>,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  findAll(relations?: string[]) {
    return this.roleRepository.find({ relations });
  }

  findOne(id: number, relations?: string[]) {
    return this.roleRepository.findOne({ where: { id }, relations });
  }

  async create(createRoleDto: CreateRoleDto) {
    const { permissions, ...roleDto } = createRoleDto;
    const newRole = await this.roleRepository.save(roleDto);
    await this.rolePermissionService.createMany(newRole.id, permissions);
    return newRole;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissions, ...updatedRole } = updateRoleDto;
    const role = await this.roleRepository.findOne({
      where: {
        id,
      },
      relations: ['permissions', 'permissions.permission'],
    });
    const rolePermissionsIds = role.permissions.map(
      ({ permission }) => permission.id,
    );
    const permissionsIdsDifference = difference(
      rolePermissionsIds,
      permissions.map(({ id }) => id),
    );

    if (permissionsIdsDifference?.length) {
      for (const permissionId of permissionsIdsDifference) {
        const rolePermission = await this.rolePermissionService.getOneByRole(
          id,
          permissionId,
        );

        if (rolePermission) {
          await this.rolePermissionService.deleteOne(rolePermission.id);
        }
      }
    }

    if (permissions?.length) {
      for (const permission of permissions) {
        if (!permissionsIdsDifference.includes(permission.id)) {
          await this.rolePermissionService.updateOne(id, permission);
        }

        if (!rolePermissionsIds.includes(permission.id)) {
          await this.rolePermissionService.createOne(id, permission);
        }
      }
    }

    return this.roleRepository.update({ id }, updatedRole);
  }

  remove(id: number) {
    return this.roleRepository.delete({ id });
  }
}
