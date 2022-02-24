import { css } from '@emotion/react';

type Props = {
  label: string;
  onClick: () => void;
};

const element = css`
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #094067;
  padding: 0 8px;
  cursor: pointer;

  &:hover {
    background: #a1d7ff;
  }
`;

export const MenuElement = ({ label, onClick }: Props) => {
  return (
    <div css={element} onClick={onClick}>
      {label}
    </div>
  );
};
