import { Injectable } from '@nestjs/common';
import { CreateCustomFieldTypeDto } from './dto/create-custom-field-type.dto';
import { UpdateCustomFieldTypeDto } from './dto/update-custom-field-type.dto';

@Injectable()
export class CustomFieldTypeService {
  create(createCustomFieldTypeDto: CreateCustomFieldTypeDto) {
    return 'This action adds a new customFieldType';
  }

  findAll() {
    return `This action returns all customFieldType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customFieldType`;
  }

  update(id: number, updateCustomFieldTypeDto: UpdateCustomFieldTypeDto) {
    return `This action updates a #${id} customFieldType`;
  }

  remove(id: number) {
    return `This action removes a #${id} customFieldType`;
  }
}
