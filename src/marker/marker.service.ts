import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker, MarkerDocument } from './schemas/marker.schema';
import { Model } from 'mongoose';
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
    let newMarkers = [];

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

  async getOne(id: string) {
    const marker = await this.markerModel.findOne({ _id: id });

    if (!marker) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Marker not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return marker;
  }

  async create(markerDto: MarkerDto, refresh_token: string) {
    const user = await this.tokenService.validateRefreshToken(refresh_token);
    const userFromBD = await this.userModel.findOne({ email: user.email });

    if (!user || !userFromBD) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const newMarker = { ...markerDto, user: userFromBD.id };

    if (!newMarker.preview) delete newMarker.preview;
    if (!newMarker.custom_fields) delete newMarker.custom_fields;

    const marker = await this.markerModel.create(newMarker);
    return marker;
  }

  async update(id: string, newMarker: MarkerUpdateDto) {
    const marker = await this.markerModel.findByIdAndUpdate(id, {
      $set: newMarker,
    });
    return marker;
  }

  async remove(id: string) {
    const marker = await this.markerModel.findByIdAndRemove(id);
    return marker;
  }
}
