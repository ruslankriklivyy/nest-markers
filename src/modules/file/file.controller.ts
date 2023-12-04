import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  UseGuards,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Get,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { FileService } from './file.service';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { MAX_FILE_SIZE_KB } from '@/consts/MAX_FILE_SIZE_KB';
import { ALLOWED_FILE_EXTENSIONS } from '@/consts/ALLOWED_FILE_EXTENSIONS';
import { uploadFileLocalOptions } from '@/config/upload-file.config';

@Controller('files')
export class FileController {
  constructor(
    private fileService: FileService,
    private configService: ConfigService,
  ) {}

  @Get(':filename')
  async getOne(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('here');

    const fileType = filename.split('.').pop();
    let contentType = 'text/plain';

    res.set({
      'Content-Type': contentType,
    });

    switch (fileType) {
      case 'svg':
        contentType = 'image/svg+xml';
        break;
      case 'html':
        contentType = 'text/html';
        break;
      default:
        contentType = `image/${fileType}`;
        break;
    }

    const filePath = join(
      process.cwd(),
      `${this.configService.get<string>('UPLOAD_DEST').slice(2)}/${filename}`,
    );

    const readStream = createReadStream(filePath);
    readStream.on('error', (err) => {
      console.error(err);
    });

    return new StreamableFile(readStream);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', uploadFileLocalOptions))
  createOne(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_KB }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_EXTENSIONS }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('FILE', file);
    return this.fileService.createOne(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.fileService.deleteOne(id);
  }
}
