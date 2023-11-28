import { DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { SeederOptions } from 'typeorm-extension';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  password: configService.get('DB_PASSWORD'),
  username: configService.get('DB_USERNAME'),
  entities: ['dist/modules/**/*.entity.{js,ts}'],
  migrations: ['dist/modules/database/migrations/*{js,ts}'],
  migrationsTableName: 'migrations',
  seeds: ['dist/modules/database/seeding/seeds/*.seed.{js,ts}'],
  factories: ['dist/modules/database/seeding/factories/*.factory.{js,ts}'],
  database: configService.get('DB_NAME'),
  synchronize: false,
  migrationsRun: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
