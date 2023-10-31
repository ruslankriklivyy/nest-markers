import 'reflect-metadata';
import { runSeeders } from 'typeorm-extension';

import dataSource from './database.config';

dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
  process.exit();
});
