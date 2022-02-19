import { Overlay } from '../../logics/Overlay';

const colorPicker = css`
  position: absolute;
  left: -80px;
  top: 8px;

  & .react-colorful {
    width: 160px;
    height: 160px;
  }
`;

export const ColorPicker = () => {
  return (
    <Overlay
      handleHide={() => {
        setShowColorPicker(false);
      }}
    >
      <div css={colorPicker}>
        <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
      </div>
    </Overlay>
  );
};
