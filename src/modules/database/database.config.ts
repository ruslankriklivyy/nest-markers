import { DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { SeederOptions } from 'typeorm-extension';

import InitialDatabaseSeed from './seeding/seeds/initial.seed';
import { User } from '@/modules/user/entities/user.entity';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  password: configService.get('DB_PASSWORD'),
  username: configService.get('DB_USERNAME'),
  entities: [User],
  migrations: [join(__dirname, './migrations/*.{ts,js}')],
  seeds: [InitialDatabaseSeed],
  factories: [],
  database: configService.get('DB_NAME'),
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
