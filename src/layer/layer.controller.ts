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

@Controller('layers')
export class LayerController {
  constructor(private layerService: LayerService) {}

  @Get()
  getAll(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.layerService.getAll(refresh_token);
  }

  @Get('/:id')
  getOne(@Param() { id }) {
    return this.layerService.getOne(id);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  createOne(@Body() dto: LayerDto, @Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.layerService.createOne(dto, refresh_token);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  updateOne(@Param() { id }, @Body() dto: LayerUpdateDto) {
    return this.layerService.updateOne(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.layerService.deleteOne(id);
  }
}
