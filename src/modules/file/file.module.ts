import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { fileProviders } from '@/modules/file/file.providers';
import { MulterConfigService } from '@/modules/file/multer/multer-config.service';

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  exports: [FileService],
  providers: [FileService, ...fileProviders],
  controllers: [FileController],
})
export class FileModule {}
