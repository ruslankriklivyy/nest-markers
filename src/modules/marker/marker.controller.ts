import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MarkerService } from './marker.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from '@/modules/marker/dto/update-marker.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '@/modules/user/entities/user.entity';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { CheckPermission } from '@/decorators/check-permission';
import { PermissionType } from '@/modules/permission/enums/permission-type.enum';

@ApiTags('markers')
@Controller('markers')
export class MarkerController {
  constructor(private markerService: MarkerService) {}

  @Get()
  getAll() {
    return this.markerService.getAll(['layer', 'images']);
  }

  @Get('/:id')
  getOne(@Param() { id }) {
    return this.markerService.getOne(id);
  }

  @SetMetadata('permission', { slug: 'markers', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Post()
  createOne(@Body() dto: CreateMarkerDto, @CurrentUser() user: User) {
    return this.markerService.createOne(user, dto);
  }

  @SetMetadata('permission', { slug: 'markers', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Patch('/:id')
  updateOne(
    @Param('id') id: number,
    @CurrentUser() user: User,
    @Body() markerDto: UpdateMarkerDto,
  ) {
    return this.markerService.updateOne(id, user.id, markerDto);
  }

  @SetMetadata('permission', { slug: 'markers', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Delete('/:id')
  deleteOne(@Param() { id }, @CurrentUser() user: User) {
    return this.markerService.deleteOne(id, user.id);
  }
}
