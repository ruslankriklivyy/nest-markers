import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Layer, LayerDocument } from './schemas/layer.schema';
import { Model } from 'mongoose';
import { Marker, MarkerDocument } from '../marker/schemas/marker.schema';
import { LayerDto } from './dto/layer.dto';
import { LayerUpdateDto } from './dto/layer-update.dto';
import { TokenService } from '../token/token.service';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class LayerService {
  constructor(
    @InjectModel(Layer.name) private layerModel: Model<LayerDocument>,
    @InjectModel(Marker.name) private markerModel: Model<MarkerDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService,
  ) {}

  async getAll(refresh_token: string) {
    const layers = await this.layerModel.find();
    const user = this.tokenService.validateRefreshToken(refresh_token);

    if (!user) {
      return await this.layerModel.find({ type: 'public' });
    }

    return layers;
  }

  async getOne(id: string) {
    const layer = await this.layerModel.findOne({ _id: id });

    if (!layer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Layer not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return layer;
  }

  async create(layerDto: LayerDto, refresh_token: string) {
    const { name, type } = layerDto;

    const user = this.tokenService.validateRefreshToken(refresh_token);
    const userFromBD = await this.userModel.findOne({ email: user.email });

    const newLayer = {
      name,
      type,
      user: userFromBD._id,
      custom_fields: layerDto?.custom_fields,
    };

    if (!newLayer.custom_fields) delete newLayer.custom_fields;

    const layer = await this.layerModel.create(newLayer);
    return layer;
  }

  async update(id: string, layerDto: LayerUpdateDto) {
    const layer = await this.layerModel.findByIdAndUpdate(id, layerDto);

    if (!layer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Layer not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return layer;
  }

  async remove(id: string) {
    const layer = await this.layerModel.findByIdAndRemove(id);

    if (!layer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Layer not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.markerModel.deleteMany({ layer: id });
    return layer;
  }
}
