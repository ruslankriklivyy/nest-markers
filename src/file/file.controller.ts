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

@Controller('')
export class FileController {
  constructor(
    private fileService: FileService,
    private tokenService: TokenService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { refresh_token } = req.cookies;
    const user = await this.tokenService.validateRefreshToken(refresh_token);

    return this.fileService.create(file, user.id);
  }

  @UseGuards(JwtGuard)
  @Delete('files/:id')
  delete(@Param() { id }) {
    return this.fileService.delete(id);
  }
}
