import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { Layer } from '@/modules/layer/entities/layer.entity';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class LayerService {
  constructor(
    @Inject('LAYER_REPOSITORY') private layerRepository: Repository<Layer>,
    private userService: UserService,
  ) {}

  async getAll() {
    return this.layerRepository.find();
  }

  async getOne(id: number) {
    return this.layerRepository.findOneBy({ id });
  }

  async createOne(userId: number, layerDto: CreateLayerDto) {
    const newLayer = new Layer();
    newLayer.name = layerDto.name;
    newLayer.type = layerDto.type;
    newLayer.author_id = userId;
    return this.layerRepository.save(newLayer);
  }

  updateOne(id: number, userId: number, layerDto: UpdateLayerDto) {
    return this.layerRepository.update({ id, author_id: userId }, layerDto);
  }

  deleteOne(id: number, userId: number) {
    return this.layerRepository.delete({ id, author: { id: userId } });
  }
}
