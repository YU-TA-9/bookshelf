import { define } from '../helpers/seeder-wrapper.helper';
import { faker as fakerOrigin } from '@faker-js/faker';
import { User } from '../../users/user.entity';

define(User, (faker: typeof fakerOrigin): User => {
  const user = new User();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  user.iconUrl = faker.image.abstract();
  // TODO: 現状は21桁だがJSの型では定義しきれないので一旦13桁
  user.google_id = String(
    faker.datatype.number({
      min: 10000000000000,
      max: 99999999999999,
    }),
  );
  // TODO: 企画が決まったら定義する
  user.password = '';

  return user;
});

export default User;
