import { DataSource } from 'typeorm';
import { SeederFactoryManager, Seeder } from 'typeorm-extension';

import { User } from '@/modules/user/entities/user.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.runMigrations({ transaction: 'each' });
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(15);
  }
}
