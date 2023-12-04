import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomFieldTypeDto } from './create-custom-field-type.dto';

export class UpdateCustomFieldTypeDto extends PartialType(CreateCustomFieldTypeDto) {}
