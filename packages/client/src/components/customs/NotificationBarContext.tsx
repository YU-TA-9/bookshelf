import * as React from 'react';
import { Type } from './NotificationRoot';

type TNotificationBarContext = {
  notify: (text: string, type?: Type) => void;
};

export const NotificationBarContext =
  React.createContext<TNotificationBarContext>(undefined);
