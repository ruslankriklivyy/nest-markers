import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { CustomField } from '@/modules/custom-field/entities/custom-field.entity';

@Injectable()
export class CustomFieldService {
  constructor(
    @Inject('CUSTOM_FIELD_REPOSITORY')
    private customFieldRepository: Repository<CustomField>,
  ) {}

  create(createCustomFieldDto: CreateCustomFieldDto) {
    return this.customFieldRepository.save(createCustomFieldDto);
  }

  findAll() {
    return this.customFieldRepository.find();
  }

  findOne(id: number) {
    return this.customFieldRepository.findOne({ where: { id } });
  }

  update(id: number, updateCustomFieldDto: UpdateCustomFieldDto) {
    return this.customFieldRepository.update({ id }, updateCustomFieldDto);
  }

  remove(id: number) {
    return this.customFieldRepository.delete({ id });
  }
}
