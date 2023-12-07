import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '@/modules/user/entities/user.entity';
import { CheckPermission } from '@/decorators/check-permission';
import { PermissionType } from '@/modules/permission/enums/permission-type.enum';

@ApiTags('layers')
@Controller('layers')
export class LayerController {
  constructor(private layerService: LayerService) {}

  @Get()
  getAll() {
    return this.layerService.getAll();
  }

  @Get('/:id')
  getOne(@Param() { id }) {
    return this.layerService.getOne(id);
  }

  @SetMetadata('permission', { slug: 'layers', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Post()
  @ApiBody({ type: CreateLayerDto })
  createOne(@CurrentUser() user: User, @Body() dto: CreateLayerDto) {
    return this.layerService.createOne(user.id, dto);
  }

  @SetMetadata('permission', { slug: 'layers', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Patch('/:id')
  @ApiBody({ type: CreateLayerDto })
  updateOne(
    @Param() { id },
    @CurrentUser() user: User,
    @Body() dto: UpdateLayerDto,
  ) {
    return this.layerService.updateOne(id, user.id, dto);
  }

  @SetMetadata('permission', { slug: 'layers', type: PermissionType.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Delete('/:id')
  deleteOne(@Param() { id }, @CurrentUser() user: User) {
    return this.layerService.deleteOne(id, user.id);
  }
}
