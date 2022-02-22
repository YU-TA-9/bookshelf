import { css } from '@emotion/react';
import * as DeleteIcon from '../../assets/icon_delete.png';

type Props = {
  onClick: () => void;
};

const deleteIcon = css`
  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;
  }
`;

export const DeleteButton = ({ onClick }: Props) => {
  return (
    <div css={deleteIcon} onClick={onClick}>
      <img alt="delete" src={DeleteIcon}></img>
    </div>
  );
};
