import * as dayjs from 'dayjs';

export const dateText = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD');
};

/**
 * 現在日時と比較しての差分を返す
 *
 * @param date
 * @returns
 */
export const calcElapsedDays = (date: string): number => {
  return Math.floor(dayjs().diff(dayjs(date)) / (24 * 60 * 60 * 1000));
};
