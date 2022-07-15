import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAll() {
    return this.userModel.find({});
  }

  async getOne(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  updateOne(id: string, dto: UserUpdateDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $set: dto,
      },
      { new: true },
    );
  }
}
