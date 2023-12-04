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
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '@/modules/user/entities/user.entity';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  createOne(@CurrentUser() user: User, @Body() dto: CreateLayerDto) {
    return this.layerService.createOne(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
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
