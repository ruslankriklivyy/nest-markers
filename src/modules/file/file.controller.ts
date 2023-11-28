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
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createOne(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.createOne(file);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.fileService.deleteOne(id);
  }
}
