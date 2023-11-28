import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { MarkerDto } from './dto/marker.dto';
import { Marker } from '@/modules/marker/entities/marker.entity';
import { UpdateMarkerDto } from '@/modules/marker/dto/update-marker.dto';

@Injectable()
export class MarkerService {
  constructor(
    @Inject('MARKER_REPOSITORY') private markerRepository: Repository<Marker>,
  ) {}

  getAll(layerId: number) {
    return this.markerRepository.find({ where: { layer: { id: layerId } } });
  }

  getOne(id: number) {
    return this.markerRepository.findOneBy({ id });
  }

  createOne(userId: number, markerDto: MarkerDto) {
    return this.markerRepository.create({ user: { id: userId }, ...markerDto });
  }

  updateOne(id: number, userId: number, markerDto: UpdateMarkerDto) {
    return this.markerRepository.update(
      { id, user: { id: userId } },
      markerDto,
    );
  }

  deleteOne(id: number) {
    return this.markerRepository.delete({ id });
  }
}
