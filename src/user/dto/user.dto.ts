import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../schemas/user.schema';

interface IUserModel {
  avatar?: { url?: string; _id?: string };
  full_name: string;
  email: string;
  _id?: string;
  is_activated: boolean;
}

export interface IUserAuth {
  user: User;
  refresh_token: string;
  access_token: string;
}

export class UserDto {
  avatar?: { url?: string; _id?: string };

  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  id?: string;

  @IsBoolean()
  is_activated: boolean;

  constructor(model: IUserModel) {
    this.avatar = model?.avatar;
    this.full_name = model.full_name;
    this.email = model.email;
    this.id = model._id;
    this.is_activated = model.is_activated;
  }
}
