import { css } from '@emotion/react';
import { Button } from '../atoms/Button';
import { HexColorPicker } from 'react-colorful';
import { ColorLabel } from './ColorLabel';

type Props = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  handleButton: () => void;
};

const colorPicker = css`
  & .react-colorful {
    width: 160px;
    height: 160px;
    padding: 16px;
    margin-bottom: 8px;
    background: #fffffe;
    border-radius: 10px;
  }
`;

const colorLabel = css`
  margin-bottom: 16px;
  margin-left: 24px;
  text-align: left;
`;

export const ColorPicker = ({ color, setColor, handleButton }: Props) => {
  return (
    <div css={colorPicker}>
      <HexColorPicker color={color} onChange={setColor} />
      <div css={colorLabel}>
        <ColorLabel color={color}></ColorLabel>
      </div>
      <Button onClick={handleButton}>設定</Button>
    </div>
  );
};
