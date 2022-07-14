import * as cloudinary from 'cloudinary';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { File, FileDocument } from './schemas/file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  create(file: any, userId: string, markerId?: string | null) {
    return new Promise((resolve, reject) =>
      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            return reject('File not uploaded');
          }

          const fileData = {
            filename: result.original_filename,
            size: result.bytes,
            ext: result.format,
            url: result.url,
            marker: markerId,
            user: userId,
          };

          if (!fileData.marker) delete fileData.marker;

          const uploadFile = this.fileModel.create(fileData);
          resolve(uploadFile);
        })
        .end(file?.buffer),
    );
  }

  async delete(fileId: string) {
    const file = await this.fileModel.findByIdAndRemove(fileId);
    const fileName = file.url.split('/').pop().split('.')[0];

    return await cloudinary.v2.uploader.destroy(
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
  }
}
