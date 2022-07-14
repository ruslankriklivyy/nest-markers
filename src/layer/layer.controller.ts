import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { LayerService } from './layer.service';
import { LayerDto } from './dto/layer.dto';
import { LayerUpdateDto } from './dto/layer-update.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('')
export class LayerController {
  constructor(private layerService: LayerService) {}

  @Get('layers')
  getAll(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.layerService.getAll(refresh_token);
  }

  @Get('layers/:id')
  getOne(@Param() { id }) {
    return this.layerService.getOne(id);
  }

  @UseGuards(JwtGuard)
  @Post('layers/create')
  create(@Body() dto: LayerDto, @Req() req: Request) {
    const { refresh_token } = req.cookies;

    return this.layerService.create(dto, refresh_token);
  }

  @UseGuards(JwtGuard)
  @Patch('layers/:id')
  update(@Param() { id }, @Body() dto: LayerUpdateDto) {
    return this.layerService.update(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('layers/:id')
  delete(@Param() { id }) {
    return this.layerService.remove(id);
  }
}
