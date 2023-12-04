import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

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
    return this.markerRepository.find({ relations: relations });
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

  updateOne(id: number, userId: number, markerDto: UpdateMarkerDto) {
    return this.markerRepository.update({ id, user_id: userId }, markerDto);
  }

  deleteOne(id: number, userId: number) {
    return this.markerRepository.delete({ id, user: { id: userId } });
  }
}
