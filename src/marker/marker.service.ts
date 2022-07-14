import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Marker, MarkerDocument } from './schemas/marker.schema';
import { MarkerDto } from './dto/marker.dto';
import { MarkerUpdateDto } from './dto/marker-update.dto';
import { TokenService } from '../token/token.service';
import { Layer, LayerDocument } from '../layer/schemas/layer.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class MarkerService {
  constructor(
    @InjectModel(Marker.name) private markerModel: Model<MarkerDocument>,
    @InjectModel(Layer.name) private layerModel: Model<LayerDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService,
  ) {}

  async getAll(refresh_token: string) {
    const markers = await this.markerModel.find({});
    const user = this.tokenService.validateRefreshToken(refresh_token);
    const newMarkers = [];

    if (!user) {
      for (const elem of markers) {
        const { type } = await this.layerModel.findOne({ _id: elem.layer });

        if (type === 'public') {
          newMarkers.push(elem);
        }
      }

      return newMarkers;
    }

    return markers;
  }

  getOne(id: string) {
    return this.markerModel.findOne({ _id: id });
  }

  async create(markerDto: MarkerDto, refresh_token: string) {
    const user = await this.tokenService.validateRefreshToken(refresh_token);
    const userFromDB = await this.userModel.findOne({ email: user.email });

    if (!user || !userFromDB) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const newMarker = { ...markerDto, user: userFromDB.id };

    if (!newMarker.custom_fields) delete newMarker.custom_fields;

    return this.markerModel.create(newMarker);
  }

  update(id: string, newMarker: MarkerUpdateDto) {
    return this.markerModel.findByIdAndUpdate(id, {
      $set: newMarker,
    });
  }

  remove(id: string) {
    return this.markerModel.findByIdAndRemove(id);
  }
}
