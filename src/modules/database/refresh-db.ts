import 'reflect-metadata';
import dataSource from './database.config';

dataSource.initialize().then(async () => {
  await dataSource.dropDatabase();
  process.exit();
});
