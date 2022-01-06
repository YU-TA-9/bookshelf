import * as React from 'react';
import { css } from '@emotion/react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const scannerWidth = 400;
const scannerHeight = 400;

const scannerWrap = css`
  position: relative;
  text-align: center;
`;

const marker = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${scannerWidth / 2}px;
  height: ${scannerHeight / 4}px;
  border: 8px solid #ff0000;
`;

type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Scanner = ({ setValue }: Props) => {
  return (
    <div css={scannerWrap}>
      <div css={marker}></div>
      <BarcodeScannerComponent
        width={scannerWidth}
        height={scannerWidth}
        onUpdate={(err, result) => {
          if (result) {
            setValue(result.getText());
          } else {
            //alert('Not Found');
          }
        }}
        stopStream={true}
      />
    </div>
  );
};
