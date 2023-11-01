import { User } from '@/modules/user/entities/user.entity';
import { UpdateUserDto } from '@/modules/user/dto/user-update.dto';

export interface IUserAuth {
  user: User;
  refresh_token: string;
  access_token: string;
}

export class UserDto {
  constructor(user: UpdateUserDto) {
    this.full_name = user.full_name;
    this.email = user.email;
    this.is_activated = user.is_activated;
    this.avatar = { id: user.avatar_id };
  }

  full_name: string;
  email: string;
  is_activated: boolean;
  avatar?: { id: number } | null;
}
