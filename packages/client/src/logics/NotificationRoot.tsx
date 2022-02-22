import { css, keyframes } from '@emotion/react';
import { NotificationBar } from '../components/atoms/notificationBar';

export type Type = 'main' | 'sub';

export type Bar = {
  id: string;
  text: string;
  type?: Type;
};

type Props = {
  bars: Bar[];
  handleAnimationEnd: (id: string) => void;
};

export const fade = keyframes`
  from, to {
    right: -2000px;
    visibility:hidden;
  }

  10%, 70% {
    right: 40px;
    visibility:visible;
  }
`;

const barWrap = (index: number) => css`
  animation-name: ${fade};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  position: fixed;
  bottom: ${60 + 60 * index}px;
`;

export const NotificationRoot = ({ bars, handleAnimationEnd }: Props) => {
  return (
    <>
      {bars.map((e, i) => (
        <div
          css={barWrap(i)}
          key={e.id}
          onAnimationEnd={() => {
            handleAnimationEnd(e.id);
          }}
        >
          <NotificationBar text={e.text} type={e.type} />
        </div>
      ))}
    </>
  );
};
