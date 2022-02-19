import { css } from '@emotion/react';
import * as React from 'react';
import { api } from '../../api/apiFactory';
import { Category } from '../../api/generated';
import { MainTemplate } from '../templates/MainTemplate';
import { HexColorPicker } from 'react-colorful';
import { Button } from '../atoms/Button';
import { Popup } from '../atoms/Popup';
import * as DeleteIcon from '../../assets/icon_delete.png';
import { TextForm } from '../atoms/TextForm';
import { LabelAndTextForm } from '../molecules/LabelAndTextForm';

const table = css`
  margin-bottom: 16px;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;

  & tr {
    border-bottom: solid 1px #e4e4e4;
  }

  & > thead > tr > th {
    font-weight: 700;
  }

  & > tbody > tr {
    &:hover {
      background-color: #d4f0fd;
    }
  }

  & th,
  td {
    text-align: center;
    width: 25%;
    padding: 16px 0;
  }
`;

const deleteIcon = css`
  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;
  }
`;

const colorIcon = (color: string) => css`
  background: ${color};
  width: 24px;
  height: 24px;
  cursor: pointer;
  vertical-align: middle;
  display: inline-block;
  margin-right: 8px;
`;

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

export const BookCategory = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [inputName, setInputName] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>();
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.categoriesControllerGetCategories();
      setCategories(data);
    })();
  }, []);

  const handleAdd = async () => {
    const { data } = await api.categoriesControllerCreateCategory({
      name: `カテゴリー${categories.length + 1}`,
      color: '#3da9fc', //default
    });
    setCategories([...categories, data]);
  };

  const handleUpdate = async (id: number, name: string, color: string) => {
    const { data } = await api.categoriesControllerPatchCategory(id, {
      name: name,
      color: color,
    });

    setCategories((prevState) => {
      const newCategories = [...prevState];
      const index = newCategories.findIndex((e, i) => e.id === data.id);
      newCategories[index].name = data.name;
      newCategories[index].color = data.color;
      return newCategories;
    });

    alert('カテゴリーを更新しました');
  };

  const handleDelete = async (id: number) => {
    const { data } = await api.categoriesControllerDeleteCategory(id);
    setCategories(categories.filter((e) => e.id !== id));
  };

  return (
    <MainTemplate title="カテゴリー">
      <table css={table}>
        <thead>
          <tr>
            <th>カテゴリー</th>
            <th>色</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((e, i) => (
            <tr key={i}>
              <td>
                <LabelAndTextForm
                  label={e.name}
                  value={inputName}
                  onClick={() => {
                    setInputName(e.name);
                  }}
                  onChange={(e) => {
                    setInputName(e.target.value);
                  }}
                  handleUpdate={() => {
                    handleUpdate(e.id, inputName, e.color);
                  }}
                />
              </td>
              <td>
                <div
                  css={colorIcon(e.color)}
                  onClick={() => {
                    setSelectedColor(e.color);
                    setSelectedCategory(e.id);
                  }}
                />
                {e.color}
                {selectedCategory === e.id && (
                  <Popup
                    handleHide={() => {
                      setSelectedCategory(0);
                    }}
                    position="absolute"
                    top={8}
                    left={-80}
                  >
                    <div css={colorPicker}>
                      <HexColorPicker
                        color={selectedColor}
                        onChange={setSelectedColor}
                      />
                      <div css={colorLabel}>
                        <div css={colorIcon(selectedColor)} />
                        <span>{selectedColor}</span>
                      </div>
                      <Button
                        label="設定"
                        onClick={() => {
                          handleUpdate(e.id, e.name, selectedColor);
                          setSelectedCategory(0);
                        }}
                      />
                    </div>
                  </Popup>
                )}
              </td>
              <td>
                <div
                  css={deleteIcon}
                  onClick={() => {
                    handleDelete(e.id);
                  }}
                >
                  <img alt="delete" src={DeleteIcon}></img>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button label="追加" onClick={handleAdd} width={124} />
    </MainTemplate>
  );
};
