import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryProvider } from '@/core/cloudinary.provider';
import { DatabaseModule } from '@/modules/database/database.module';
import { fileProviders } from '@/modules/file/file.providers';
import { FileRepository } from '@/modules/file/file.repository';
import { TokenService } from '@/modules/token/token.service';
import { tokenProviders } from '@/modules/token/token.providers';

@Module({
  providers: [
    CloudinaryProvider,
    FileService,
    TokenService,
    FileRepository,
    ...fileProviders,
    ...tokenProviders,
  ],
  controllers: [FileController],
  imports: [JwtModule.register({}), DatabaseModule],
})
export class FileModule {}
