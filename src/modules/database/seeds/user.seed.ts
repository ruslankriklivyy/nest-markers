import * as bcrypt from 'bcrypt';
import dataSource from '@/modules/database/database.config';
import { User } from '@/modules/user/entities/user.entity';

export default async function UserSeed() {
  const userRepository = dataSource.getRepository(User);
  const password = await bcrypt.hash('123456789', 3);

  const adminUser = new User();
  adminUser.email = 'admin@example.com';
  adminUser.password = password;
  adminUser.full_name = 'admin';
  adminUser.role_id = 1;

  const user = new User();
  user.email = 'user@example.com';
  user.password = password;
  user.full_name = 'user';
  user.role_id = 2;

  await userRepository.insert([adminUser, user]);
}
