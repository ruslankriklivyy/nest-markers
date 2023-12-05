import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserService } from '@/modules/user/user.service';
import { PermissionType } from '@/modules/permission/enums/permission-type.enum';

@Injectable()
export class CheckPermission implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const metaDataPermission = this.reflector.get(
      'permission',
      context.getHandler(),
    );

    const user = await this.userService.getById(request.user.id, [
      'role',
      'role.permissions',
      'role.permissions.permission',
    ]);

    const isHasPermission = !!user.role.permissions.find(
      (rolePermission) =>
        (rolePermission.permission.slug === metaDataPermission.slug &&
          rolePermission.type === metaDataPermission.type) ||
        rolePermission.type === PermissionType.Editable,
    );

    if (!isHasPermission) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "You don't have permissions",
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
