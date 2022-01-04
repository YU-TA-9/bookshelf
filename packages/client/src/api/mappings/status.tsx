import { BookStatusEnum } from '../generated';

export const STATUS = {
  waiting: BookStatusEnum.NUMBER_1,
  working: BookStatusEnum.NUMBER_2,
  completed: BookStatusEnum.NUMBER_3,
  pending: BookStatusEnum.NUMBER_4,
} as const;

export type status = typeof STATUS[keyof typeof STATUS];
