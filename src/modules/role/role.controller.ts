import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { CheckPermission } from '@/decorators/check-permission';
import { PermissionType } from '@/modules/permission/enums/permission-type.enum';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @SetMetadata('permission', { slug: 'roles', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @SetMetadata('permission', { slug: 'roles', type: PermissionType.Viewed })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Get()
  findAll() {
    return this.roleService.findAll(['permissions', 'permissions.permission']);
  }

  @SetMetadata('permission', { slug: 'roles', type: PermissionType.Viewed })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id, [
      'permissions',
      'permissions.permission',
    ]);
  }

  @SetMetadata('permission', { slug: 'roles', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @SetMetadata('permission', { slug: 'roles', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
