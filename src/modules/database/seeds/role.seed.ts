import dataSource from '@/modules/database/database.config';
import { Role } from '@/modules/role/entities/role.entity';

export default async function RoleSeed() {
  const roleRepository = dataSource.getRepository(Role);

  const adminRole = new Role();
  adminRole.name = 'Admin';
  adminRole.slug = 'admin';

  const userRole = new Role();
  userRole.name = 'User';
  userRole.slug = 'user';

  await roleRepository.insert([adminRole, userRole]);
}
