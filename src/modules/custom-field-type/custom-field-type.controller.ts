import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomFieldTypeService } from './custom-field-type.service';
import { CreateCustomFieldTypeDto } from './dto/create-custom-field-type.dto';
import { UpdateCustomFieldTypeDto } from './dto/update-custom-field-type.dto';

@ApiTags('custom-field-types')
@Controller('custom-field-types')
export class CustomFieldTypeController {
  constructor(
    private readonly customFieldTypeService: CustomFieldTypeService,
  ) {}

  @Post()
  create(@Body() createCustomFieldTypeDto: CreateCustomFieldTypeDto) {
    return this.customFieldTypeService.create(createCustomFieldTypeDto);
  }

  @Get()
  findAll() {
    return this.customFieldTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customFieldTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomFieldTypeDto: UpdateCustomFieldTypeDto,
  ) {
    return this.customFieldTypeService.update(+id, updateCustomFieldTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customFieldTypeService.remove(+id);
  }
}
