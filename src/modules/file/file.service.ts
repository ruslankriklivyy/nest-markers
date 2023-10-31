import * as cloudinary from 'cloudinary';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { FileRepository } from '@/modules/file/file.repository';

@Injectable()
export class FileService {
  constructor(@Inject(FileRepository) private fileRepository: FileRepository) {}

  createOne(file: Express.Multer.File) {
    return new Promise((resolve, reject) =>
      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            return reject('File not uploaded');
          }

          const fileData = {
            filename: result.original_filename,
            size: result.bytes,
            type: result.format,
            url: result.url,
            owner: null,
          };

          const uploadFile = this.fileRepository.create(fileData);

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
}
