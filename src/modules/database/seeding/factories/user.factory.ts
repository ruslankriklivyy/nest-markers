import { Faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';

import { User } from '@/modules/user/entities/user.entity';

export default setSeederFactory(User, async (faker: Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = await bcrypt.hash('12345678', 3);
  user.full_name = faker.internet.userName();
  return user;
});
