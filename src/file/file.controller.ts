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
import { FileService } from './file.service';
import { TokenService } from '../token/token.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('')
export class FileController {
  constructor(
    private fileService: FileService,
    private tokenService: TokenService,
  ) {}

  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { refresh_token } = req.cookies;
    const user = await this.tokenService.validateRefreshToken(refresh_token);
    const newFile = await this.fileService.create(file, user.id);

    return newFile;
  }

  @Delete('files/:id')
  delete(@Param() { id }) {
    return this.fileService.delete(id);
  }
}
