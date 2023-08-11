interface Props {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ options, onChange }: Props) {
  return (
    <select name="season" onChange={onChange}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
