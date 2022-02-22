import * as React from 'react';
import { NotificationBarContext } from './NotificationBarContext';
import { Bar, NotificationRoot, Type } from './NotificationRoot';

type Props = {
  children: React.ReactNode;
};

type BarState = {
  view: Bar[];
  queue: Bar[];
  lastQueueId: string | null;
};

export const NotificationProvider = ({ children }: Props) => {
  const [barState, setBarState] = React.useState<BarState>({
    view: [],
    queue: [],
    lastQueueId: null,
  });

  const isFirstRender = React.useRef(true);

  // TODO: 引数をObjectにした方が楽かも
  const notify = (text: string, type?: Type) => {
    setBarState((prevState) => {
      return {
        ...prevState,
        queue: [
          ...prevState.queue,
          { id: String(Math.random()), text: text, type: type },
        ],
      };
    });
  };

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      setBarState((prevState) => {
        const { view, queue, lastQueueId } = prevState;
        // MEMO: 以下の分岐処理について
        // ここが呼び出されるタイミングは、
        // 1: notify()実行時
        // 2: 以下判定true時処理実行時
        // それぞれの処理の意図は以下への対策
        // lastQueueId === null -> 2初回実行時にはtrueにしたい
        // view.length === 0 -> 2実行後かつ画面にbarが無い時にはtrueにしたい
        // (queue.length > 0 && view.findIndex((e) => e.id === lastQueueId) > -1)
        //  -> 2実行による発火時はfalseを返すため
        if (
          lastQueueId === null ||
          view.length === 0 ||
          (queue.length > 0 && view.findIndex((e) => e.id === lastQueueId) > -1)
        ) {
          return {
            view: [...view, queue[0]],
            queue: queue.slice(1, queue.length),
            lastQueueId: queue[0].id,
          };
        }
        return prevState;
      });
    }
  }, [barState.queue]);

  const test2 = (id: string) => {
    setBarState({
      ...barState,
      view: barState.view.filter((e, i) => e.id !== id),
    });
  };

  return (
    <NotificationBarContext.Provider value={{ notify }}>
      {children}
      <NotificationRoot bars={barState.view} handleAnimationEnd={test2} />
    </NotificationBarContext.Provider>
  );
};
