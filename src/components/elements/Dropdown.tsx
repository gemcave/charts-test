import styles from "./Dropdown.module.css";
type TOptions = {
  value: string;
  label: string;
};

interface IDropdown {
  name: string;
  label: string;
  value: string;
  options: TOptions[];
  onChange: (event: any) => void;
}

export const Dropdown: React.FC<IDropdown> = ({
  name,
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className={styles.dropdown}>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
