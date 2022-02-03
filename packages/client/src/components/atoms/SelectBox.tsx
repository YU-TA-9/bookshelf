type Options = {
  value: string | number;
  label: string;
};

type Props = {
  value: string | number;
  options: Options[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectBox = ({ value, options, onChange }: Props) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((e, i) => (
        <option key={i} value={e.value}>
          {e.label}
        </option>
      ))}
    </select>
  );
};
