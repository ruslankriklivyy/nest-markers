import { Injectable } from '@nestjs/common';
import { CreatePermissionRoleDto } from './dto/create-permission-role.dto';
import { UpdatePermissionRoleDto } from './dto/update-permission-role.dto';

@Injectable()
export class RolePermissionService {
  create(createPermissionRoleDto: CreatePermissionRoleDto) {
    return 'This action adds a new permissionRole';
  }

  findAll() {
    return `This action returns all permissionRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionRole`;
  }

  update(id: number, updatePermissionRoleDto: UpdatePermissionRoleDto) {
    return `This action updates a #${id} permissionRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionRole`;
  }
}
