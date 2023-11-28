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
import { MarkerDto } from './dto/marker.dto';
import { UpdateMarkerDto } from '@/modules/marker/dto/update-marker.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '@/modules/user/entities/user.entity';
import { AuthGuard } from '@/modules/auth/guard/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post()
  createOne(@Body() dto: MarkerDto, @CurrentUser() user: User) {
    return this.markerService.createOne(user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  updateOne(
    @Param() { id },
    @Body() dto: UpdateMarkerDto,
    @CurrentUser() user: User,
  ) {
    return this.markerService.updateOne(id, user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.markerService.deleteOne(id);
  }
}
