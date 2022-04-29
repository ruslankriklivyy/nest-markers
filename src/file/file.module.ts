import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schemas/file.schema';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TokenService } from '../token/token.service';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryProvider } from '../core/cloudinary.provider';

@Module({
  providers: [FileService, TokenService, CloudinaryProvider],
  controllers: [FileController],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
})
export class FileModule {}
