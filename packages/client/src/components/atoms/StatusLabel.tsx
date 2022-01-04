import { STATUS, status } from '../../api/mappings/status';

export const StatusLabel = (value: status): string => {
  switch (value) {
    case STATUS.waiting:
      return '未読';
    case STATUS.working:
      return '着手中';
    case STATUS.completed:
      return '読了';
    case STATUS.pending:
      return '中断';
  }
};
