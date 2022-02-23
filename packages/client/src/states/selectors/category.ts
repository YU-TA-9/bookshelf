import { selectorFamily } from 'recoil';
import { categoriesState } from '../atoms/category';

export const selectedCategoryState = selectorFamily({
  key: 'selectedCategoryState',
  get:
    (id: number) =>
    ({ get }) => {
      const categories = get(categoriesState);
      return categories.find((category) => category.id === id);
    },
});
