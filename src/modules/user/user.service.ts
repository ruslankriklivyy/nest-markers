import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserUpdateDto } from './dto/user-update.dto';
import { User } from '@/modules/user/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.find({});
  }

  create(dto: CreateUserDto) {
    return this.userRepository.create(dto);
  }

  getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  getOne(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  updateOne(id: number, dto: UserUpdateDto) {
    return this.userRepository.update({ id }, dto);
  }
}
