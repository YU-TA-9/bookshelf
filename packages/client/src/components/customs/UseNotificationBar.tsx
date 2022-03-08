import * as React from 'react';
import { NotificationBarContext } from './NotificationBarContext';

export const useNotificationBar = () => {
  return React.useContext(NotificationBarContext);
};
