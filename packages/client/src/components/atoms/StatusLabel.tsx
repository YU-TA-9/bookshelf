import { STATUS, status } from '../../api/mappings/status';

// TODO: 装飾をつける
export const StatusLabel = (value: status): string => {
  switch (value) {
    case STATUS.waiting:
      return '未読';
    case STATUS.working:
      return '読書中';
    case STATUS.completed:
      return '読了';
    case STATUS.pending:
      return '中断';
  }
};
