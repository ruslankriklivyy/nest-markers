import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryProvider } from '@/core/cloudinary.provider';
import { DatabaseModule } from '@/modules/database/database.module';
import { fileProviders } from '@/modules/file/file.providers';
import { tokenProviders } from '@/modules/token/token.providers';
import { AuthGuard } from '@/modules/auth/guard/auth.guard';
import { TokenService } from '@/modules/token/token.service';

@Module({
  providers: [
    CloudinaryProvider,
    FileService,
    TokenService,
    AuthGuard,
    ...tokenProviders,
    ...fileProviders,
  ],
  controllers: [FileController],
  imports: [JwtModule.register({}), DatabaseModule],
})
export class FileModule {}
