import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryProvider } from '@/core/cloudinary.provider';
import { DatabaseModule } from '@/modules/database/database.module';
import { fileProviders } from '@/modules/file/file.providers';

@Module({
  providers: [CloudinaryProvider, FileService, ...fileProviders],
  controllers: [FileController],
  imports: [JwtModule.register({}), DatabaseModule],
})
export class FileModule {}
