import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createOne(@UploadedFile() file: Express.Multer.File) {
    console.log('FILE', file);
    return this.fileService.createOne(file);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.fileService.deleteOne(id);
  }
}
