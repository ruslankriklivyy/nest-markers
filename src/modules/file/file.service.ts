import * as cloudinary from 'cloudinary';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { File } from '@/modules/file/entities/file.entity';
import { FILE_ENTITY_TYPES } from '@/consts/FILE_ENTITY_TYPES';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_REPOSITORY') private fileRepository: Repository<File>,
  ) {}

  createOne(file: Express.Multer.File) {
    return new Promise((resolve, reject) =>
      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            return reject('File not uploaded');
          }

          const newFile = this.fileRepository.create({
            filename: file.originalname,
            size: result.bytes,
            type: result.format,
            url: result.url,
          });
          const uploadFile = this.fileRepository.save(newFile);

          resolve(uploadFile);
        })
        .end(file?.buffer),
    );
  }

  async deleteOne(fileId: number) {
    const file = await this.fileRepository.findOneBy({ id: fileId });
    const fileName = file.url.split('/').pop().split('.')[0];

    await cloudinary.v2.uploader.destroy(
      fileName,
      (
        error: cloudinary.UploadApiErrorResponse | undefined,
        result: cloudinary.UploadApiResponse | undefined,
      ) => {
        if (error || !result) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'File not deleted',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        return fileName;
      },
    );

    return this.fileRepository.delete({ id: fileId });
  }

  attach(fileId: number, entityId: number, entityType: FILE_ENTITY_TYPES) {
    return this.fileRepository.update(
      { id: fileId },
      { entity_id: entityId, entity_type: entityType },
    );
  }
}
