import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/user-update.dto';
import { User } from '@/modules/user/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { FileService } from '@/modules/file/file.service';
import { FILE_ENTITY_TYPES } from '@/consts/FILE_ENTITY_TYPES';
import { UserDto } from '@/modules/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private fileService: FileService,
  ) {}

  getAll() {
    return this.userRepository.find({ relations: { avatar: true } });
  }

  async create(creatUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      full_name: creatUserDto.full_name,
      email: creatUserDto.email,
      password: creatUserDto.password,
      is_activated: creatUserDto.is_activated,
    });

    if (creatUserDto.avatar_id) {
      await this.fileService.attach(
        creatUserDto.avatar_id,
        user.id,
        FILE_ENTITY_TYPES.User,
      );
    }

    await user.save();

    return user;
  }

  getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  getOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async updateOne(id: number, dto: UpdateUserDto) {
    if (dto.avatar_id) {
      await this.fileService.attach(dto.avatar_id, id, FILE_ENTITY_TYPES.User);
    }

    const userDto = new UserDto(dto);

    return this.userRepository.update({ id }, userDto);
  }
}
