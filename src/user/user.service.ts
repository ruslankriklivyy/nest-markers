import { Injectable } from '@nestjs/common';
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

  getOne(email: string) {
    return this.userModel.findOne({ email });
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
