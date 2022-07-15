import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { MarkerService } from './marker.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { MarkerDto } from './dto/marker.dto';
import { MarkerUpdateDto } from './dto/marker-update.dto';

@Controller()
export class MarkerController {
  constructor(private markerService: MarkerService) {}

  @Get('markers')
  getAll(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.markerService.getAll(refresh_token);
  }

  @Get('markers/:id')
  getOne(@Param() { id }) {
    return this.markerService.getOne(id);
  }

  @UseGuards(JwtGuard)
  @Post('markers/create')
  create(@Body() dto: MarkerDto, @Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.markerService.create(dto, refresh_token);
  }

  @UseGuards(JwtGuard)
  @Patch('markers/:id')
  update(@Param() { id }, @Body() dto: MarkerUpdateDto) {
    return this.markerService.update(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('markers/:id')
  delete(@Param() { id }) {
    return this.markerService.remove(id);
  }
}
