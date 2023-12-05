import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { CreatePermissionRoleDto } from './dto/create-permission-role.dto';
import { UpdatePermissionRoleDto } from './dto/update-permission-role.dto';

@Controller('permission-roles')
export class RolePermissionController {
  constructor(private readonly permissionRolesService: RolePermissionService) {}

  @Post()
  create(@Body() createPermissionRoleDto: CreatePermissionRoleDto) {
    return this.permissionRolesService.create(createPermissionRoleDto);
  }

  @Get()
  findAll() {
    return this.permissionRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionRolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionRoleDto: UpdatePermissionRoleDto,
  ) {
    return this.permissionRolesService.update(+id, updatePermissionRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionRolesService.remove(+id);
  }
}
