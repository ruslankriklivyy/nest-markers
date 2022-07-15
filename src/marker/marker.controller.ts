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

@UseGuards(JwtGuard)
@Controller('markers')
export class MarkerController {
  constructor(private markerService: MarkerService) {}

  @Get()
  getAll(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.markerService.getAll(refresh_token);
  }

  @Get('/:id')
  getOne(@Param() { id }) {
    return this.markerService.getOne(id);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  createOne(@Body() dto: MarkerDto, @Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.markerService.createOne(dto, refresh_token);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  updateOne(@Param() { id }, @Body() dto: MarkerUpdateDto) {
    return this.markerService.updateOne(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.markerService.deleteOne(id);
  }
}
