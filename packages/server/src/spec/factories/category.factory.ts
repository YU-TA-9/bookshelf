import { define } from '../helpers/seeder-wrapper.helper';
import { faker as fakerOrigin } from '@faker-js/faker';
import { getRandomColorCode } from '../helpers/test.helper';
import { Category } from '../../categories/category.entity';

define(Category, (faker: typeof fakerOrigin): Category => {
  const category = new Category();
  // 13桁
  category.name = faker.name.jobTitle();
  category.color = getRandomColorCode();

  return category;
});

export default Category;
