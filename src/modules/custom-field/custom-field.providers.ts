import { DataSource } from 'typeorm';

import { CustomField } from '@/modules/custom-field/entities/custom-field.entity';

export const customFieldProviders = [
  {
    provide: 'CUSTOM_FIELD_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomField),
    inject: ['DATA_SOURCE'],
  },
];
