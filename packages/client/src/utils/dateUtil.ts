import * as dayjs from 'dayjs';

export const dateText = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD');
};
