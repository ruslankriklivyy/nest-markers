import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '@/modules/user/entities/user.entity';
import { Layer } from '@/modules/layer/entities/layer.entity';

@ApiTags('layers')
@Controller('layers')
export class LayerController {
  constructor(private layerService: LayerService) {}

  @Get()
  @ApiProperty({ type: Layer, isArray: true })
  getAll() {
    return this.layerService.getAll();
  }

  @Get('/:id')
  getOne(@Param() { id }) {
    return this.layerService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateLayerDto })
  createOne(@CurrentUser() user: User, @Body() dto: CreateLayerDto) {
    return this.layerService.createOne(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBody({ type: CreateLayerDto })
  updateOne(
    @Param() { id },
    @CurrentUser() user: User,
    @Body() dto: UpdateLayerDto,
  ) {
    return this.layerService.updateOne(id, user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }, @CurrentUser() user: User) {
    return this.layerService.deleteOne(id, user.id);
  }
}
