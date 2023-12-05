import { DataSource } from 'typeorm';

import { CustomFieldType } from '@/modules/custom-field-type/entities/custom-field-type.entity';

export const customFieldTypeProviders = [
  {
    provide: 'CUSTOM_FIELD_TYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomFieldType),
    inject: ['DATA_SOURCE'],
  },
];
