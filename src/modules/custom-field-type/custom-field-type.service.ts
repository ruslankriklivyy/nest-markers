import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomFieldTypeDto } from './dto/create-custom-field-type.dto';
import { UpdateCustomFieldTypeDto } from './dto/update-custom-field-type.dto';
import { Repository } from 'typeorm';
import { CustomFieldType } from '@/modules/custom-field-type/entities/custom-field-type.entity';

@Injectable()
export class CustomFieldTypeService {
  constructor(
    @Inject('CUSTOM_FIELD_TYPE_REPOSITORY')
    private customFieldTypeRepository: Repository<CustomFieldType>,
  ) {}

  create(createCustomFieldTypeDto: CreateCustomFieldTypeDto) {
    return this.customFieldTypeRepository.save(createCustomFieldTypeDto);
  }

  findAll() {
    return this.customFieldTypeRepository.find();
  }

  findOne(id: number) {
    return this.customFieldTypeRepository.findOne({ where: { id } });
  }

  update(id: number, updateCustomFieldTypeDto: UpdateCustomFieldTypeDto) {
    return this.customFieldTypeRepository.update(
      { id },
      updateCustomFieldTypeDto,
    );
  }

  remove(id: number) {
    return this.customFieldTypeRepository.delete({ id });
  }
}
