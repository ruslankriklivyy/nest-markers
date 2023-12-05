import 'reflect-metadata';

import dataSource from './database.config';
import InitialSeed from '@/modules/database/seeds/initial.seed';

dataSource.initialize().then(async () => {
  try {
    await InitialSeed();
  } catch (error) {
    console.log('Seed error: ', error);
  } finally {
    process.exit();
  }
});
