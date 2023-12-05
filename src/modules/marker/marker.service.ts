import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { difference } from 'lodash';

import { CreateMarkerDto } from './dto/create-marker.dto';
import { Marker } from '@/modules/marker/entities/marker.entity';
import { UpdateMarkerDto } from '@/modules/marker/dto/update-marker.dto';
import { User } from '@/modules/user/entities/user.entity';
import { FileService } from '@/modules/file/file.service';
import { FILE_ENTITY_TYPES } from '@/consts/FILE_ENTITY_TYPES';

@Injectable()
export class MarkerService {
  constructor(
    @Inject('MARKER_REPOSITORY') private markerRepository: Repository<Marker>,
    private readonly fileService: FileService,
  ) {}

  getAll(relations?: string[]) {
    return this.markerRepository.find({ relations });
  }

  getOne(id: number) {
    return this.markerRepository.findOneBy({ id });
  }

  async createOne(user: User, markerDto: CreateMarkerDto) {
    try {
      const {
        title,
        description,
        latitude,
        longitude,
        color,
        layer_id,
        images_ids,
      } = markerDto;

      const newMarker = new Marker();

      newMarker.user_id = user.id;
      newMarker.layer_id = layer_id;
      newMarker.title = title;
      newMarker.description = description;
      newMarker.latitude = latitude;
      newMarker.longitude = longitude;
      newMarker.color = color;

      const marker = await this.markerRepository.save(newMarker);

      if (images_ids?.length && marker) {
        await this.fileService.attachMany(
          images_ids,
          marker.id,
          FILE_ENTITY_TYPES.Marker,
        );
      }

      return marker;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Marker was not created',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateOne(id: number, userId: number, markerDto: UpdateMarkerDto) {
    const marker = await this.markerRepository.findOne({
      where: { id, user_id: userId },
      select: ['images'],
      relations: ['images'],
    });
    const { images_ids, ...newMarker } = markerDto;

    const imagesIdsDifference = difference(
      marker.images.map((image) => image.id),
      images_ids,
    );

    if (imagesIdsDifference?.length) {
      await this.fileService.deleteMany(imagesIdsDifference);
    }

    return this.markerRepository.update({ id, user_id: userId }, newMarker);
  }

  deleteOne(id: number, userId: number) {
    return this.markerRepository.delete({ id, user_id: userId });
  }
}
