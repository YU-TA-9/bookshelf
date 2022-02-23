import { atom } from 'recoil';
import { Category } from '../../api/generated/api';

export const categoriesState = atom<Category[]>({
  key: 'categoriesState',
  default: [],
});
