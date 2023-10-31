import { IsBoolean, IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { User } from '@/modules/user/entities/user.entity';

interface IUserModel {
  full_name: string;
  email: string;
  id: number;
  is_activated: boolean;
}

export interface IUserAuth {
  user: User;
  refresh_token: string;
  access_token: string;
}

export class UserDto {
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsInt()
  id: number;

  @IsBoolean()
  is_activated: boolean;

  constructor(model: IUserModel) {
    this.full_name = model.full_name;
    this.email = model.email;
    this.id = model.id;
    this.is_activated = model.is_activated;
  }
}
