import {
  Controller,
  Post,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { TokenService } from '../token/token.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('files')
export class FileController {
  constructor(
    private fileService: FileService,
    private tokenService: TokenService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createOne(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { refresh_token } = req.cookies;
    const user = await this.tokenService.validateRefreshToken(refresh_token);

    return this.fileService.createOne(file, user.id);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.fileService.deleteOne(id);
  }
}
