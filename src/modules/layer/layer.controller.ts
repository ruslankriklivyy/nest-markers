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
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post('/create')
  createOne(@Body() dto: CreateLayerDto, @Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.layerService.createOne(dto, refresh_token);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  updateOne(@Param() { id }, @Body() dto: UpdateLayerDto) {
    return this.layerService.updateOne(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.layerService.deleteOne(id);
  }
}
