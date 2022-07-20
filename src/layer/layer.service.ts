import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Layer, LayerDocument } from './schemas/layer.schema';
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

  async getAll(refresh_token: string, query: Record<string, string>) {
    const user = this.tokenService.validateRefreshToken(refresh_token);

    if (!user) {
      return this.layerModel.find({ type: 'public' });
    }

    const page = +query?.page > 0 ? +query?.page : 1;
    const limit = +query?.limit || 0;
    const offset = +((page - 1) * limit);
    const paging = {
      limit,
      offset,
    };

    const layersTotal = await this.layerModel.count();

    //  TODO: add type
    const paginationData: any = {
      limit,
      offset,
      page,
      totalDocs: layersTotal,
      totalPages: Math.ceil(layersTotal / limit),
    };
    paginationData.hasNextPage =
      paginationData.page < paginationData.totalPages;
    paginationData.hasPrevPage = paginationData.page > 1;

    const layers = await this.layerModel
      .find()
      .skip(paging.offset)
      .limit(limit);

    return { docs: layers, ...paginationData };
  }

  async getOne(id: string) {
    return this.layerModel.findOne({ _id: id });
  }

  async createOne(layerDto: LayerDto, refresh_token: string) {
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

    return this.layerModel.create(newLayer);
  }

  updateOne(id: string, layerDto: LayerUpdateDto) {
    return this.layerModel.findByIdAndUpdate(id, layerDto);
  }

  async deleteOne(id: string) {
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
