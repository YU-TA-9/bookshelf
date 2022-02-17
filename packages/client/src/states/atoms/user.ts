import { atom } from 'recoil';
import { User } from '../../api/generated/api';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
