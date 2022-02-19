import { ColorIcon } from '../atoms/ColorIcon';

type Props = {
  color: string;
  onClick?: () => void;
};

export const ColorLabel = ({ color, onClick }: Props) => {
  return (
    <>
      <ColorIcon color={color} onClick={onClick} />
      {color}
    </>
  );
};
