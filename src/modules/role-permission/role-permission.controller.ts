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
}
