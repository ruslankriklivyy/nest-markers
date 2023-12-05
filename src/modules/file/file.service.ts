import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';

import { File } from '@/modules/file/entities/file.entity';
import { FILE_ENTITY_TYPES } from '@/consts/FILE_ENTITY_TYPES';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_REPOSITORY') private fileRepository: Repository<File>,
    private configService: ConfigService,
  ) {}

  createOne(file: Express.Multer.File) {
    const newFile = new File();
    const filePath = this.configService.get<string>('UPLOAD_DEST').slice(2);

    newFile.filename = file.filename;
    newFile.size = file.size;
    newFile.type = file.mimetype;
    newFile.url = `${filePath}/${file.filename}`;

    return this.fileRepository.save(newFile);
  }

  createMany(files: Express.Multer.File[]) {
    const newFiles: File[] = [];
    const filePath = this.configService.get<string>('UPLOAD_DEST').slice(2);

    for (const file of files) {
      const newFile = new File();

      newFile.filename = file.filename;
      newFile.size = file.size;
      newFile.type = file.mimetype;
      newFile.url = `${filePath}/${file.filename}`;

      newFiles.push(newFile);
    }

    return this.fileRepository.insert(newFiles);
  }

  async deleteOne(fileId: number) {
    const file = await this.fileRepository.findOne({ where: { id: fileId } });

    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'File not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await fs.unlink(file?.url);
    return this.fileRepository.delete({ id: fileId });
  }

  deleteMany(filesIds: number[]) {
    return this.fileRepository.delete({ id: In(filesIds) });
  }

  async attach(
    fileId: number,
    entityId: number,
    entityType: FILE_ENTITY_TYPES,
  ) {
    switch (entityType) {
      case FILE_ENTITY_TYPES.Marker:
        await this.fileRepository.update(fileId, {
          marker: { id: entityId },
        });
        break;
      case FILE_ENTITY_TYPES.User:
        await this.fileRepository.update(fileId, {
          user: { id: entityId },
        });
        break;
      default:
        return null;
    }
  }

  async attachMany(
    filesIds: number[],
    entityId: number,
    entityType: FILE_ENTITY_TYPES,
  ) {
    try {
      const files = await this.fileRepository.find({
        where: { id: In(filesIds) },
      });

      for (const file of files) {
        switch (entityType) {
          case FILE_ENTITY_TYPES.Marker:
            await this.fileRepository.update(file.id, {
              marker: { id: entityId },
            });
            break;
          case FILE_ENTITY_TYPES.User:
            await this.fileRepository.update(file.id, {
              user: { id: entityId },
            });
            break;
          default:
            return;
        }
      }

      return 'Success attached';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
