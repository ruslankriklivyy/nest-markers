import { Module } from '@nestjs/common';
import { CustomFieldTypeService } from './custom-field-type.service';
import { CustomFieldTypeController } from './custom-field-type.controller';

@Module({
  controllers: [CustomFieldTypeController],
  providers: [CustomFieldTypeService],
})
export class CustomFieldTypeModule {}
