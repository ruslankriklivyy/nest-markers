import { Module } from '@nestjs/common';

import { CustomFieldTypeService } from './custom-field-type.service';
import { CustomFieldTypeController } from './custom-field-type.controller';
import { customFieldTypeProviders } from '@/modules/custom-field-type/custom-field-type.providers';
import { DatabaseModule } from '@/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomFieldTypeController],
  providers: [CustomFieldTypeService, ...customFieldTypeProviders],
})
export class CustomFieldTypeModule {}
