import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { dataSourceOptions } from '@/modules/database/database.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async () => {
      const dataSource = new DataSource(dataSourceOptions);
      return dataSource.initialize();
    },
  },
];
