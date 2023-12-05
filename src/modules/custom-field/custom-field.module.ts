import { Module } from '@nestjs/common';
import { CustomFieldService } from './custom-field.service';
import { CustomFieldController } from './custom-field.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { customFieldProviders } from '@/modules/custom-field/custom-field.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomFieldController],
  providers: [CustomFieldService, ...customFieldProviders],
})
export class CustomFieldModule {}
