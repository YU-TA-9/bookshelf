import { css } from '@emotion/react';
import * as React from 'react';
import { api } from '../../api/apiFactory';
import { Overlay } from '../../logics/Overlay';
import { Button } from '../atoms/Button';
import { TextForm } from '../atoms/TextForm';

type Props = {
  label: string;
  value: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, ...args: any) => void;
  handleUpdate: (...args: any) => void;
};

const labelArea = css`
  cursor: pointer;
`;

export const LabelAndTextForm = ({
  label,
  value,
  onClick,
  onChange,
  handleUpdate,
}: Props) => {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  return (
    <>
      {showForm ? (
        <Overlay
          handleHide={() => {
            setShowForm(false);
          }}
        >
          <TextForm value={value} onChange={onChange}></TextForm>
          <Button
            onClick={() => {
              handleUpdate();
              setShowForm(false);
            }}
            inline
          >
            更新
          </Button>
        </Overlay>
      ) : (
        <p
          css={labelArea}
          onClick={() => {
            onClick();
            setShowForm(true);
          }}
        >
          {label}
        </p>
      )}
    </>
  );
};
