import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { PermissionType } from '@/modules/permission/enums/permission-type.enum';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRolePermissionDto {
  @IsNumber()
  id: number;

  @IsEnum(PermissionType)
  type: PermissionType;
}

export class UpdateRolePermissionDto extends PartialType(
  CreateRolePermissionDto,
) {}

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsArray()
  permissions: CreateRolePermissionDto[];
}
