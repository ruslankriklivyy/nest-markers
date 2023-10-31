import { DataSource } from 'typeorm';

import { AbstractPolymorphicRepository } from 'typeorm-polymorphic';
import { File } from '@/modules/file/entities/file.entity';

export const fileProviders = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      AbstractPolymorphicRepository.createRepository(dataSource, File),
    inject: ['DATA_SOURCE'],
  },
];
