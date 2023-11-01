import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { TokenService } from '../token/token.service';
import { Layer } from '@/modules/layer/entities/layer.entity';
import { UserService } from '@/modules/user/user.service';
import { LAYER_TYPE } from '@/consts/LAYER_TYPE_PUBLIC';

@Injectable()
export class LayerService {
  constructor(
    @Inject('LAYER_REPOSITORY') private layerRepository: Repository<Layer>,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async getAll(refreshToken: string) {
    const user = this.tokenService.validateRefreshToken(refreshToken);

    if (!user) {
      return this.layerRepository.findOneBy({ type: LAYER_TYPE.Public });
    }

    return this.layerRepository.find();
  }

  async getOne(id: number) {
    return this.layerRepository.findOneBy({ id });
  }

  async createOne(layerDto: CreateLayerDto, refreshToken: string) {
    const { name, type } = layerDto;

    const user = this.tokenService.validateRefreshToken(refreshToken);
    const userFromBD = await this.userService.getOne(user.email);

    const newLayer = {
      name,
      type,
      user: userFromBD.id,
    };

    return this.layerRepository.create(newLayer);
  }

  updateOne(id: number, layerDto: UpdateLayerDto) {
    return this.layerRepository.update({ id }, layerDto);
  }

  deleteOne(id: number) {
    return this.layerRepository.delete({ id });
  }
}
